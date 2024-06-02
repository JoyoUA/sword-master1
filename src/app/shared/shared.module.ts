import { NgModule } from '@angular/core';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { RouterModule } from '@angular/router';

const components = [
    HeaderComponent,
    FooterComponent
]

// const modules = []

@NgModule({
    declarations: components,
    exports: [
      ...components,
    //   ...modules
    ],
    imports: [
    //   ...modules,
      RouterModule
    ],
    providers: [
    ]
  })
export class SharedModule { }
