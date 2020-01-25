import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UnitModule } from './units/unit.module';
import { WeighinModule } from './weighins/weighin.module';

import { ConfigService } from './services/config.service';
import { first } from 'rxjs/operators';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './shared/cache.interceptor';
import { HeaderInterceptor } from './shared/header.interceptor';
import { AuthInterceptor } from './shared/auth.interceptor';

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
    SharedModule,
    AuthModule,
    UnitModule,
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
