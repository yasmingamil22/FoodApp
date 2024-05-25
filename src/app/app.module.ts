import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,

    ToastrModule.forRoot({ 
      positionClass: 'toast-bottom-center',
      timeOut: 5000
  }), 
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:GlobalInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoadingInterceptor,
      multi:true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
