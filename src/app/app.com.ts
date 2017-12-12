import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.state';

/**
 * App Component
 * Top Level Component
 */
@Component
({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.com.css'
  ],
  template: `
    <nav>
      <a [routerLink]=" ['./'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Index
      </a>
      <a [routerLink]=" ['./first'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        First
      </a>
      <a [routerLink]=" ['./second'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Second
      </a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

    <footer>
    </footer>
  `
})
export class AppCom implements OnInit {

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
