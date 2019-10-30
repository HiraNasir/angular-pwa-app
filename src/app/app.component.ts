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
  addBtn = document.querySelector('.add-button');
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

    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('beforeinstallprompt fired');
      this.defferedPrompt = event;
      event.preventDefault();
    });


  }
  
   addToHomeScreen() {
     console.log('hi inside function');
     console.log(this.defferedPrompt);
     
    if (this.defferedPrompt) {
      this.defferedPrompt.prompt();
      console.log(this.defferedPrompt);
  
      this.defferedPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);
  
        if (choiceResult.outcome === 'dismissed') {
          console.log('User cancelled installation');
        } else {
          console.log('User added to home screen');
        }
      });
  
      this.defferedPrompt = null;
    }
  }
}
