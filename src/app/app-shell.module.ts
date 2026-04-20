import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, AppModule, RouterModule.forRoot([])],
  bootstrap: [AppComponent],
})
export class AppShellModule {}
