import { Injectable } from "@angular/core";
import { Subject, debounceTime, delay, timer } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BusService {

    private subjectNotify = new Subject<string>();

    notify$ = this.subjectNotify.asObservable().pipe(delay(0))

    trigerNotify(msg: string): void{
        this.subjectNotify.next(msg)
        timer(5000).subscribe(() => this.subjectNotify.next(''))
        
    }

}