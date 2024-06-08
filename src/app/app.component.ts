import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from './core/web-socket.service';import { ChatService } from './core/chat.service';
import { BusService } from './core/bus.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  notifyShow: boolean = false;
  notifyMessage: string = '';

  // newMessage!: string;
  // messageList: any[] = [];

  constructor(private wss: WebSocketService, public bus: BusService ){}

  // ngOnInit(): void {
  //   this.wss.connection()
  // }

  ngOnDestroy(): void {
    this.wss.disconnect()
  }

  ngOnInit(){
    this.bus.notify$.subscribe((msg: string) => {
      if(msg){
        this.notifyShow = true;
        this.notifyMessage = msg;
      } else this.notifyShow = false;
    })
    // this.bus.trigerNotify('load')
    // this.bus.notify$.subscribe(msg => {})
    // this.chatService.getNewMessage().subscribe((message: string) => {
    //   if(Array.isArray(message)){
    //     this.messageList.push(message);
    //     console.log(this.messageList);
      
    //   }
    // })
  }

  sendMessage() {
    // this.chatService.sendMessage(this.newMessage);
    // this.newMessage = '';
  }

  createRoom(){
    
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    document.body.classList.add('touch')
  }
}
