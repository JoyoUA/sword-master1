import { NgModule } from "@angular/core";
import { GameMenuComponent } from "./game-menu.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [GameMenuComponent],
    exports: [GameMenuComponent],
    imports: [CommonModule, RouterModule],
    providers: [],
    // entryComponents: [GameMenuComponent],
    // bootstrap: [GameMenuComponent]
})

export class GameMenuModel { }