import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Authllizer } from '@authllizer/core';
import { Observable } from 'rxjs';

/**
 * @see https://angular.io/api/common/http/HttpInterceptor
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    get _auth(): Authllizer {
        return this.injector.get(Authllizer);
    }

    constructor(private injector: Injector) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let { url, headers } = request;

        if (!headers.has('Authorization') && this._auth.toIntercept(url)) {
            let header = this._auth.getToken().toHeader();
            request = request.clone({ setHeaders: { 'Authorization': header } });
        }

        return next.handle(request);

    }

}
