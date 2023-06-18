import { AuthService } from '../../services/auth/auth.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, NgModel } from '@angular/forms';
import { AuthModule } from '@angular/fire/auth';
import { LoadingComponent } from '../loading/loading.component';
// declare var $:any

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  confirmPassword:string;
  emailInvalid:boolean;
  public message:string='';
  public loading:boolean=false;
  signupData={
    email:'',
    password:''
  }
  constructor(private router:Router,private authService:AuthService,private http:HttpClient,private load:LoadingComponent){
   this.signupData.email='';
   this.signupData.password='';
   this.confirmPassword='';
   this.emailInvalid=false;
   
  }
 
 
  ngOnInit():void {  //when url is typed it will check if there is a user who is already loggedin
    if(this.authService.getLoggedin())
    {
      this.router.navigate(['/dashboard']);
    }
  }
  signUp(signupForm: NgForm):void {
     if(this.signupData.email.length==0 || !this.validateEmail(this.signupData.email)) 
     {
      this.emailInvalid = true; // Set emailInvalid as true if email format is invalid
      alert('Please fill the details');
      console.log('Please fill the details');
     }
     else if(!this.isPasswordContainsLowercase() ||
      !this.isPasswordContainsNumber() ||
      !this.isPasswordContainsUppercase() ||
      !this.isPasswordContainsSpecialChar() ||
      !this.isPasswordLengthValid())
      {
        alert('Please enter valid password');
        console.log('Please enter valid password');
      }
     else if(this.signupData.password!=this.confirmPassword)
     {
      alert('please confirm the password');
      console.log('please confirm the password');
     }
     else {
       this.loading=true;
       setTimeout(() => {
          this.authService.signUp(this.signupData.email,this.signupData.password);
          this.loading = false;
        }, 2000);
    }
   }
  login():void {
    this.router.navigate(['/login']);
  }
  // closeModal()
  // {
  //   $('#errorMessageModal').modal('hide');
  // }





  //validation rules

  validateEmail(email: string): boolean {
    // Email validation using a regular expression
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
  }

  isPasswordLengthValid(): boolean {
    return this.signupData.password.length >= 8;
  }
  
  isPasswordContainsUppercase(): boolean {
    return /[A-Z]/.test(this.signupData.password);
  }
  
  isPasswordContainsLowercase(): boolean {
    return /[a-z]/.test(this.signupData.password);
  }
  
  isPasswordContainsNumber(): boolean {
    return /[0-9]/.test(this.signupData.password);
  }
  
  isPasswordContainsSpecialChar(): boolean {
    return /[!@#$%^&*()]/.test(this.signupData.password);
  }
}
