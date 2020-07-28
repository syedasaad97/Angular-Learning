import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from './Routes';

import { RouterModule,Routes } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { enableTracing: true } )// <-- debugging purposes only)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
