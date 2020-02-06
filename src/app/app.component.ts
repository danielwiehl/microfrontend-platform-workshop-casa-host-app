import { Component, ElementRef, ViewChild } from '@angular/core';
import { Beans, CapabilityProvider, ManifestService, MessageClient, SciRouterOutletElement } from '@scion/microfrontend-platform';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @ViewChild('outlet', {static: true})
  public outlet: ElementRef<SciRouterOutletElement>;

  public toolbarItems$: Observable<CapabilityProvider[]>;

  constructor() {
    this.toolbarItems$ = this.findToolbarItems$();
  }

  public onPersonOpen(id: string): void {
    Beans.get(MessageClient).issueIntent$({type: 'view', qualifier: {entity: 'person', id: id}}).subscribe();

  }

  public onToolbarItemClick(toolbarItem: CapabilityProvider): void {
    Beans.get(MessageClient).issueIntent$({type: toolbarItem.type, qualifier: toolbarItem.qualifier}).subscribe();

  }

  private findToolbarItems$(): Observable<CapabilityProvider[]> {
    return Beans.get(ManifestService).lookupCapabilityProviders$({
      type: 'toolbar-item',
      qualifier: {
        "location": "header",
        "*": "*",
      },
    })
  }
}
