import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotFoundPageComponent
      }
    ])
  ],
  declarations: [NotFoundPageComponent]
})
export class NotFoundPageModule { }
