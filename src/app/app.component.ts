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


    window.addEventListener('beforeinstallprompt', function (event) {
      console.log('beforeinstallprompt is fired')
      event.preventDefault();
      this.defferedPrompt = event;
      return false;
    });
    // document.getElementById('btnAdd').addEventListener('click', (e) => {
    //   // hide our user interface that shows our A2HS button

    //   // Show the prompt
    //   this.defferedPrompt.prompt();
    //   // Wait for the user to respond to the prompt
    //   this.defferedPrompt.userChoice
    //     .then((choiceResult) => {
    //       if (choiceResult.outcome === 'accepted') {
    //         console.log('User accepted the A2HS prompt');
    //       } else {
    //         console.log('User dismissed the A2HS prompt');
    //       }
    //       this.defferedPrompt = null;
    //     });
    // });
  }
}
