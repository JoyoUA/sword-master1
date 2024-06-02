import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { GamesComponent } from "./games.component";
import { SwordMasterComponent } from "./sword-masted/sword-masted.component";
import { GamesRoutingModule } from "./games-routing.module";
import { PipeModule } from "../shared/pipe/pipe.module";

@NgModule({
    declarations: [GamesComponent, SwordMasterComponent],
    exports: [SwordMasterComponent],
    imports: [CommonModule, RouterModule, FormsModule, GamesRoutingModule, PipeModule],
    providers: [],
})

export class GamesModule {}