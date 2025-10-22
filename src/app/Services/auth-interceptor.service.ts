import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

// It is interceptor service so we don't need to provide it in root or module
/* @Injectable(
    {
    providedIn: 'root'
    }
) */
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request is on its way');
        return next.handle(req);
    }
    
}