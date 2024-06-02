import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from './core/web-socket.service';import { ChatService } from './core/chat.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'N';

  // newMessage!: string;
  // messageList: any[] = [];

  constructor(private wss: WebSocketService, private chatService: ChatService){}

  // ngOnInit(): void {
  //   this.wss.connection()
  // }

  ngOnDestroy(): void {
    this.wss.disconnect()
  }

  ngOnInit(){
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
}
