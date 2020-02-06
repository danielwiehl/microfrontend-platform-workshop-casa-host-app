import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlatformInitializerService } from './microfrontend-platform/platform-initializer.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: provideMicrofrontendPlatformInitializerFn,
    deps: [PlatformInitializerService],
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {
}

export function provideMicrofrontendPlatformInitializerFn(initializer: PlatformInitializerService): () => Promise<void> {
  return (): Promise<void> => initializer.init();
}
