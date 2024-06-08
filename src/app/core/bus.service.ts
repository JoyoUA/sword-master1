import { Injectable } from "@angular/core";
import { Subject, delay } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BusService {

    private subjectNotify = new Subject<string>();

    notify$ = this.subjectNotify.asObservable().pipe(delay(0))

    trigerNotify(msg: string): void{
        this.subjectNotify.next(msg);
    }

}