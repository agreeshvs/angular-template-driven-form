import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    http: HttpClient = inject(HttpClient);
    logError(data:{statusCode: number, errorMessage: string, datetime: Date}){
        this.http.post('https://angularhttpclient-3b419-default-rtdb.firebaseio.com/log.json',data)
        .subscribe();
    }

    fetchError(){
        this.http.get('https://angularhttpclient-3b419-default-rtdb.firebaseio.com/log.json')
        .subscribe( (data) =>{
            console.log("log data", data);
        });
    }
}