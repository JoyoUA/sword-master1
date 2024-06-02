import { Component, OnDestroy, OnInit } from '@angular/core';
@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})

export class GameMenuComponent implements OnInit {

    gamesList: string[] = ['sword-master', 'test']
    constructor() { }

    ngOnInit(): void {
        
    }

}