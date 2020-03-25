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
    response.setHeader('Content-Type', 'application/json');
    if (
      error &&
      error instanceof HttpErrors.UnprocessableEntity &&
      request.url === '/coffee-shops'
    ) {
      const newError = {
        message: 'My customized validation error message',
        code: 'VALIDATION_FAILED',
        resolution: 'Contact your admin for troubleshooting.',
      };
      // You can also change the status code here
      response.status(422).send(JSON.stringify(newError));
    } else {
      const e = <HttpErrors.HttpError>error;
      const newError = {
        message: e.message,
      };
      response.status(e.statusCode).send(JSON.stringify(newError));
    }
  }
}
