import {
  /* inject, */
  bind,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/context';
import {CoffeeShop} from '../models';
import {HttpErrors} from '@loopback/rest';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@bind({tags: {key: ValidatePhoneNumInterceptor.BINDING_KEY}})
export class ValidatePhoneNumInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${ValidatePhoneNumInterceptor.name}`;

  /*
  constructor() {}
  */

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      const coffeeShop: CoffeeShop = new CoffeeShop();
      if (invocationCtx.methodName == 'create')
        Object.assign(coffeeShop, invocationCtx.args[0]);
      else if (invocationCtx.methodName == 'updateById')
        Object.assign(coffeeShop, invocationCtx.args[1]);

      if (
        coffeeShop &&
        !this.isAreaCodeValid(coffeeShop.phoneNum, coffeeShop.city)
      ) {
        throw new HttpErrors.InternalServerError(
          'Area code and city do not match',
        );
      }

      const result = await next();
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }

  isAreaCodeValid(phoneNum: string, city: string): Boolean {
    // add some logic here
    // it always returns true for now
    return true;
  }
}
