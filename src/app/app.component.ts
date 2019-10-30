import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  update: boolean = false;
  defferedPrompt: any;

  VAPID_PUBLIC = "BNCXKhTTGNah_ZjSesYKw08qbM2GfAHB_sJUw2PLs0X4QhkMRA-ngrfqgPGPa70OluaXNCLLM7QeTorT2wkqebw";
  constructor(update: SwUpdate, swPush: SwPush, pushService: PushNotificationService) {

    update.available.subscribe(event => {
      this.update = true;
      console.log(this.update)
    })

    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC,
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe()
        })
        .catch(console.error)
    }

    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      return false;
    });
  }
}
