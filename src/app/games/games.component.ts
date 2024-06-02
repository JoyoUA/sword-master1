import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-games',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./games.component.css']
})

export class GamesComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

}