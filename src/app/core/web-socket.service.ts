import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket!: any;

  constructor() { }

  connection(){
    this.socket = io(environment.SOKET_ENDPOINT, {
      auth: {
        token: 'abc'
      }
    })

    this.socket.emit('message', 'my socket connection')

    this.socket.on('my broadcast', (data: any) => {
      console.log(data)
    })
  }

  disconnect(){
    if(this.socket){
      this.socket.disconnect()
    }
  }

}
