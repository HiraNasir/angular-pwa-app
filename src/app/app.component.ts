import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  update: boolean = false;
  title = 'angular-PWA';

  constructor(update: SwUpdate, swPush: SwPush) {
    update.available.subscribe(event => {
      this.update = true;
      console.log(this.update)
    })
    if (swPush.isEnabled) {
      console.log ('pushed')
    }

  }


}
