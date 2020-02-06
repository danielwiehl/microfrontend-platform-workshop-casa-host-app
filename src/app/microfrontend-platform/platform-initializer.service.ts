import { Injectable, NgZone } from '@angular/core';
import { ApplicationConfig, Beans, ClientConfig, MessageClient, MicrofrontendPlatform, PlatformMessageClient, PlatformState, PlatformStates } from '@scion/microfrontend-platform';
import { AngularZoneMessageClientDecorator } from './angular-zone-message-client.decorator';

@Injectable({providedIn: 'root'})
export class PlatformInitializerService {

  constructor(private zone: NgZone) {
  }

  public init(): Promise<void> {
    // Initialize the platform to run with Angular.
    // For more information, see AngularZoneMessageClientDecorator
    Beans.get(PlatformState).whenState(PlatformStates.Starting).then(() => {
      Beans.register(NgZone, {useValue: this.zone});
      Beans.registerDecorator(MessageClient, {useClass: AngularZoneMessageClientDecorator});
      Beans.registerDecorator(PlatformMessageClient, {useClass: AngularZoneMessageClientDecorator});
    });

    // Configure the platform
    const appConfigs: ApplicationConfig[] = [
      {symbolicName: 'casa-host-app', manifestUrl: '/assets/manifest.json'},
      {symbolicName: 'casa-app-1', manifestUrl: 'http://localhost:4201/assets/manifest.json'},
    ];
    const hostAppConfig: ClientConfig = {symbolicName: 'casa-host-app'};

    // Start the platform
    return MicrofrontendPlatform.forHost(appConfigs, hostAppConfig);
  }
}
