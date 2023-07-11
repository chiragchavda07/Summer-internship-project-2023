import { Component, OnInit } from '@angular/core';
// import {AuthService} from './services/auth/auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Glimpse';
  ngOnInit():void {  
    // localStorage.clear();
  }
  // constructor(private ath:AuthService)
  // {
  //   // this.ath.setLoggedin(false);
  // }
}

// window.addEventListener('beforeunload', () => {
//   const router = new Router;
//   router.navigate(['/login']);
// });