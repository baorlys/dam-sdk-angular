import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DamUploadWidgetComponent } from './dam-upload-widget/dam-upload-widget.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {EditorModule} from "primeng/editor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    EditorModule,
    DamUploadWidgetComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
