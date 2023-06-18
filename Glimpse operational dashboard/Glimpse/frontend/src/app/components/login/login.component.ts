import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // Add .html extension here
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  title='login'
  private email:string;
  private password:string;
  public message:string='';
  public loading:boolean;
  loginData={
    email:'',
    password:''
  }
  constructor(private http:HttpClient,private router:Router,private authService:AuthService) { 
    this.email='';
    this.password='';
    this.loading=false;
  }
  ngOnInit():void{
    if(this.authService.getLoggedin())
    {
      this.router.navigate(['/dashboard']);
    }
  }
  login(loginForm: NgForm){
    console.log(this.loginData.email,' ',this.loginData.password,' login under process ',this.authService.getLoggedin());
      // $('#loadingModal').modal('show');
      if(loginForm.valid)
      {
        this.loading=true;
        this.authService.login(this.loginData.email,this.loginData.password);
          setTimeout(() => {
          this.loading = false;
        }, 0);
        // setTimeout(() => {
        //   this.authService.login(this.loginData.email,this.loginData.password);
        //   this.loading = false;
        // }, 2000);
        // this.load.flag=false;
            return true;
      }
       else
      {
            this.message='Please fill valid credential';
            alert(this.message);
            return false;
      }

    }
  signUp():void{
    this.router.navigate(['/signup']);
  }  
}
