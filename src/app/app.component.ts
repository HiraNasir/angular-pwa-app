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


    window.addEventListener('beforeinstallprompt', function (e) {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      var a2hsBtn = document.querySelector(".ad2hs-prompt");
    
      a2hsBtn.addEventListener("click", addToHomeScreen);
     function  addToHomeScreen() {  var a2hsBtn = document.querySelector(".ad2hs-prompt");  // hide our user interface that shows our A2HS button
      // Show the prompt
      this.defferedPrompt.prompt();  // Wait for the user to respond to the prompt
      this.defferedPrompt.userChoice
        .then(function(choiceResult){
    
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    
      this.defferedPrompt = null;
    
    });}
    
    });


    // window.addEventListener('beforeinstallprompt', (e) => {
    //   // Prevent Chrome 67 and earlier from automatically showing the prompt
    //   e.preventDefault();
    //   // Stash the event so it can be triggered later.
    //   this.defferedPrompt = e;
    //   // Update UI to notify the user they can add to home screen
      

    //   this.addBtn.addEventListener('click', (e) => {
    //     // hide our user interface that shows our A2HS button
    //     // Show the prompt
    //     this.defferedPrompt.prompt();
    //     // Wait for the user to respond to the prompt
    //     this.defferedPrompt.userChoice.then((choiceResult) => {
    //       if (choiceResult.outcome === 'accepted') {
    //         console.log('User accepted the A2HS prompt');
    //       } else {
    //         console.log('User dismissed the A2HS prompt');
    //       }
    //       this.defferedPrompt = null;
    //     });
    //   });
    // });
  }
}
