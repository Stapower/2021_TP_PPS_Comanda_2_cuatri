import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {
  constructor(public router: Router) {}

  ionViewDidEnter() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 10);
    setTimeout(() => {
      /* this.router.navigate(['tabs']);*/
      this.router.navigate(['/folder/Log In'], { replaceUrl: true });
    }, 3000);
  }
}
