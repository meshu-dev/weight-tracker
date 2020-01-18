import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './common/shared.module';
import { WeighinModule } from './weighins/weighin.module';

import { ConfigService } from './services/config.service';
import { first } from 'rxjs/operators';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './common/cache.interceptor';
import { HeaderInterceptor } from './common/header.interceptor';
import { AuthInterceptor } from './common/auth.interceptor';

function init(configService: ConfigService) {
  return () => {
    return new Promise((resolve) => {
      configService.load(resolve);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    SharedModule,
    AuthModule,
    WeighinModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [
        ConfigService
      ],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
