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
  messageList: any[] = [];

  @ViewChild('wordInput') wordInput!: ElementRef;

  constructor(private wss: WebSocketService, private chatService: ChatService) { }

  ngOnDestroy(): void {
    this.wss.disconnect()
  }

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: any) => {
      if(message.success == 'wordUnHide'){
        alert('слово угадано')
        this.messageList = []
      } else if(message.error == 'wordNotFound'){
        alert('слово не найдено в словаре')
      } else if(message.word){
        if(Array.isArray(message.word)){
          this.messageList.unshift(message.word)      
        }
      }
    })
  }

  sendMessage() {
    const userWord = this.wordInput.nativeElement.value.toLowerCase()
    const wordsList = this.getWordsFromLetters(this.messageList)
    if(userWord.length == 0) return
    if(userWord.length != 5){
      alert('слово должно быть 5 букв')
      this.wordInput.nativeElement.value = ''

    } else if(wordsList.includes(userWord)){
      alert('слово уже использовано')
      this.wordInput.nativeElement.value = ''

    } else {
      this.chatService.sendMessage(userWord)
      this.wordInput.nativeElement.value = ''
    }
  }

  autoFocus() {
    this.wordInput.nativeElement.focus();
  }

  getWordsFromLetters(letterSets: LetterStatus[][]): string[] {
    return letterSets.map(set => set.map(item => item.letter).join(''));
  }

  // private getWordsFromLetters(array: string[]) {
  //   return array.map((set: string) => {
  //     return set.map(item => item.letter).join('');
  //   });
  // }
  
  // Получаем слова из массивов букв

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    this.autoFocus()
  }
  
  @HostListener('click', ['$event'])
  onClick(){
    this.autoFocus()
  }

}

interface LetterStatus {
  letter: string;
  valid: string;
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