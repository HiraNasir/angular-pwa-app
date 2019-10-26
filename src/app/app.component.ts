import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  update: boolean = false;
  title = 'angular-PWA';

  constructor(update: SwUpdate) {
    update.available.subscribe(event => {
      this.update = true;
      console.log(this.update)
    })


  }


}
