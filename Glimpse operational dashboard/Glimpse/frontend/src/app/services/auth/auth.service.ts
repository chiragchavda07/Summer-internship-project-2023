// import { LoginComponent } from './../../components/login/login.component';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
// import { SignupComponent } from 'src/app/components/signup/signup.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedin:Boolean = false;
  private message:string | undefined;
  constructor(private fireAuth:AngularFireAuth,private router:Router) { 
  }
  
  async login(email:string ,password:string){
      await this.fireAuth.signInWithEmailAndPassword(email,password).then( ()=>{
      // this.loginC.loading = false;
      this.setLoggedin(true);
      this.message = 'login successfully'
      console.log(this.message, this.getLoggedin());
      localStorage.setItem('token','true');
      this.router.navigate(['/dashboard']);
    },
    err=>{
      // this.loginC.loading = false;
      this.message='Please enter correct email and password or please check your internet connection';
      alert(this.message);
      // $('#errorMessageModal').modal('show');
      console.log("something went wrong");
      this.router.navigate(['/login']);
    })
  }
  async signUp(email:string,password:string){
     await this.fireAuth.createUserWithEmailAndPassword(email,password).then(()=>{
      this.setLoggedin(true);
      localStorage.setItem('token','true');
      this.message='User has registered successfully, press ok to go dashboard';
      alert(this.message);
      // $('#errorMessageModal').modal('show');
      console.log("registration successful");
      this.router.navigate(['/dashboard']);
    }, err=>{
      this.message='Please check your internet connection or try to signup with another email address';
      alert(this.message);
      // $('#errorMessageModal').modal('show');
      console.log('User exists already');
      console.log("something went wrong");
      this.router.navigate(['/signup']);
    })
  }
  logOut(){
    this.fireAuth.signOut().then(()=>{
     localStorage.removeItem('isLoggedin');
     localStorage.removeItem('token');
     this.router.navigate(['./login']);
    },err=>{
      console.log("Can't log out");
    })
  }
  setLoggedin(value:boolean)
  {
    this.isLoggedin = value;
    localStorage.setItem('isLoggedin',String(this.isLoggedin));
  }
  getLoggedin()
  {
    return localStorage.getItem('isLoggedin')==='true';
  }
}
