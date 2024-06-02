import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/core/chat.service';
import { WebSocketService } from 'src/app/core/web-socket.service';
@Component({
  selector: 'app-sword-master',
  templateUrl: './sword-masted.component.html',
    styleUrls: ['./sword-masted.component.css', './../games.component.css']
})

export class SwordMasterComponent implements OnInit {
  newMessage!: string;
  messageList: any[] = [...example];

  @ViewChild('wordInput') wordInput!: ElementRef;

  constructor(private wss: WebSocketService, private chatService: ChatService) { }

  ngOnDestroy(): void {
    this.wss.disconnect()
  }

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: string) => {
      if(Array.isArray(message)){
        this.messageList.unshift(message);
        console.log(this.messageList);
      
      }
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  autoFocus() {
    this.wordInput.nativeElement.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    this.autoFocus()
  }
  
  @HostListener('click', ['$event'])
  onClick(){
    this.autoFocus()
  }

}

export interface Message {
  letter: string;
  valid: 'has' | 'success' | 'fail'
}

const example = [
  [
      {
          "letter": "д",
          "valid": "fail"
      },
      {
          "letter": "и",
          "valid": "fail"
      },
      {
          "letter": "в",
          "valid": "has"
      },
      {
          "letter": "а",
          "valid": "has"
      },
      {
          "letter": "н",
          "valid": "fail"
      }
  ],
  [
      {
          "letter": "а",
          "valid": "has"
      },
      {
          "letter": "к",
          "valid": "fail"
      },
      {
          "letter": "у",
          "valid": "fail"
      },
      {
          "letter": "л",
          "valid": "has"
      },
      {
          "letter": "а",
          "valid": "success"
      }
  ],
  [
      {
          "letter": "а",
          "valid": "has"
      },
      {
          "letter": "к",
          "valid": "fail"
      },
      {
          "letter": "у",
          "valid": "fail"
      },
      {
          "letter": "л",
          "valid": "has"
      },
      {
          "letter": "а",
          "valid": "success"
      }
  ],
  [
      {
          "letter": "с",
          "valid": "success"
      },
      {
          "letter": "л",
          "valid": "success"
      },
      {
          "letter": "о",
          "valid": "success"
      },
      {
          "letter": "в",
          "valid": "success"
      },
      {
          "letter": "о",
          "valid": "has"
      }
  ],
  [
      {
          "letter": "з",
          "valid": "fail"
      },
      {
          "letter": "а",
          "valid": "has"
      },
      {
          "letter": "л",
          "valid": "has"
      },
      {
          "letter": "о",
          "valid": "has"
      },
      {
          "letter": "г",
          "valid": "fail"
      }
  ],
  [
      {
          "letter": "о",
          "valid": "has"
      },
      {
          "letter": "к",
          "valid": "fail"
      },
      {
          "letter": "е",
          "valid": "fail"
      },
      {
          "letter": "а",
          "valid": "has"
      },
      {
          "letter": "н",
          "valid": "fail"
      }
  ],
  [
      {
          "letter": "ж",
          "valid": "fail"
      },
      {
          "letter": "и",
          "valid": "fail"
      },
      {
          "letter": "з",
          "valid": "fail"
      },
      {
          "letter": "н",
          "valid": "fail"
      },
      {
          "letter": "ь",
          "valid": "fail"
      }
  ],
  [
      {
          "letter": "с",
          "valid": "success"
      },
      {
          "letter": "и",
          "valid": "fail"
      },
      {
          "letter": "л",
          "valid": "has"
      },
      {
          "letter": "о",
          "valid": "has"
      },
      {
          "letter": "с",
          "valid": "has"
      }
  ],
  [
      {
          "letter": "з",
          "valid": "fail"
      },
      {
          "letter": "а",
          "valid": "has"
      },
      {
          "letter": "л",
          "valid": "has"
      },
      {
          "letter": "о",
          "valid": "has"
      },
      {
          "letter": "г",
          "valid": "fail"
      }
  ]
]