import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';
@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})

export class NotFoundComponent implements OnInit, OnDestroy {

  @Input() expire: number = 500
  
  @Output() onExpired = new EventEmitter

  private sb = new Subscription

  constructor() { }

  ngOnInit(): void {
    if(this.expire > 0) {
      this.sb.add(timer(this.expire).subscribe(() => this.onExpired.emit()))
    }
  }
  
  ngOnDestroy(): void {
    this.sb.unsubscribe()
  }

}