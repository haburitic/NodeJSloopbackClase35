
import {
    SequenceHandler,
    RequestContext,
    DefaultSequence,
    FindRoute,
    InvokeMethod,
    ParseParams,
    Reject,
    RestBindings,
    Send,
    HttpErrors,
    SequenceActions,
  } from '@loopback/rest';
  
  // ---------- ADD IMPORTS -------------
  import {
    AuthenticateFn,
    AuthenticationBindings,
    AUTHENTICATION_STRATEGY_NOT_FOUND,
    USER_PROFILE_NOT_FOUND,
  } from '@loopback/authentication';
  
  import { inject } from '@loopback/core';
  
  export class MySequence implements SequenceHandler {
    constructor(
      // ---- ADD THIS LINE ------
      @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
      @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
      @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
      @inject(SequenceActions.SEND) public send: Send,
      @inject(SequenceActions.REJECT) public reject: Reject,
      @inject(AuthenticationBindings.AUTH_ACTION)
      protected authenticateRequest: AuthenticateFn,
    ) { }
  
    async handle(context: RequestContext): Promise<void> {
      try {
        const { request, response } = context;
        const route = this.findRoute(request);
        // - enable jwt auth -
        // call authentication action
        // ---------- ADD THIS LINE -------------
        await this.authenticateRequest(request);
        const args = await this.parseParams(request, route);
        const result = await this.invoke(route, args);
        this.send(response, result);
      } catch (err) {
        // ---------- ADD THIS SNIPPET -------------
        // if error is coming from the JWT authentication extension
        // make the statusCode 401
        if (
          err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
          err.code === USER_PROFILE_NOT_FOUND
        ) {
          Object.assign(err, { statusCode: 401 /* Unauthorized */ });
        }
        // ---------- END OF SNIPPET -------------
        this.reject(context, err);
      }
    }
  }
  