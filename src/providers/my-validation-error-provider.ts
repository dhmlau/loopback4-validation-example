import {Provider, inject} from '@loopback/core';
import {
  Reject,
  HandlerContext,
  RestHttpErrors,
  HttpErrors,
} from '@loopback/rest';

// Reference: https://github.com/strongloop/loopback-next/issues/1867
export class MyValidationErrorProvider implements Provider<Reject> {
  constructor() {}

  value() {
    // Use the lambda syntax to preserve the "this" scope for future calls!
    return (response: HandlerContext, result: Error) => {
      this.action(response, result);
    };
  }

  action({request, response}: HandlerContext, error: Error) {
    // handle the error and send back the error response
    // "response" is an Express Response object
    if (
      error &&
      error instanceof HttpErrors.UnprocessableEntity &&
      request.url == '/coffee-shops'
    ) {
      let newError: Error = error;
      newError.message = 'My customized validation error message';
      newError.name = 'VALIDATION_ERROR';
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(newError));
    } else {
      response.end(response);
    }
  }
}
