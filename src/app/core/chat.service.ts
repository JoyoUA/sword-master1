
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io(environment.SOKET_ENDPOINT);

  public sendMessage(message: any) {
    this.socket.emit('message', {message: message});
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) => {
      console.log(message);
      
      this.message$.next(message);
    });
    
    return this.message$.asObservable();
  };
}