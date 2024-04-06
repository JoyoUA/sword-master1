import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { WebSocketService } from './core/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  word = 'шкала'
  newMessage = '';
  messageList: string[] = [];
  @ViewChild('wordsBlock') wordsBlock!: ElementRef

  constructor(private wss: WebSocketService) {

  }
  ngOnInit(){
    this.wss.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  ngOnDestroy() {
    // this.messageSubscription.unsubscribe();
  }


  send(event: any) {
    // const inputValue = event.target.value;
    // if (this.wordsBlock) {
    //   const spanElement = document.createElement('span'); // Создаем новый элемент <span>

    //   spanElement.textContent = inputValue; // Устанавливаем текст нового элемента
  
    //   // Добавляем созданный элемент к содержимому элемента wordsBlock
    //   this.wordsBlock.nativeElement.appendChild(spanElement);
    // }

    // if (this.message.trim() !== '') {
    //   this.wss.sendMessage({ message: this.message });
    //   this.message = '';
    // }
    this.wss.sendMessage(this.newMessage);
    this.newMessage = '';
  }
  
}
