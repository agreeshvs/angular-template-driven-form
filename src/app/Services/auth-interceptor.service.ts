import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

// It is interceptor service so we don't need to provide it in root or module
/* @Injectable(
    {
    providedIn: 'root'
    }
) */
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('Request is on its way');
        console.log('Auth Interceptor - Request made with url: ', req.url);
        const modifiedReq = req.clone({
            headers:req.headers.append('Auth','xyz')
        });
        return next.handle(modifiedReq).pipe(tap( (event) =>{            
            if( event.type === HttpEventType.Response){
               console.log('Response received');
                console.log('Resposne Data :: ',event.body);
            }
        }));
    }
    
}