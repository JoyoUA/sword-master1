import { NgModule } from "@angular/core";
import { ReversePipe } from "./reverse.pipe";

const PIPES = [
    ReversePipe
]

@NgModule({
    declarations: PIPES,
    exports: PIPES
})

export class PipeModule {}