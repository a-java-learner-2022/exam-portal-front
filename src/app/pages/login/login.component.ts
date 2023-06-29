import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logindata = {username:'',password:''};

  constructor(private snack:MatSnackBar, private loginService:LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("login btn submitted.");
    if (this.logindata.username.trim() =='' || this.logindata.username.trim() == null){
        this.snack.open('Username is required!','',{
          duration:3000
        });
        return;
    }
    if (this.logindata.password.trim() =='' || this.logindata.password.trim() == null){
      this.snack.open('password is required!','',{
        duration:3000
      });
      return;
    }
    //request server to generate token 
    this.loginService.generateToken(this.logindata).subscribe(
      (data: any) => {
        //success
        console.log('success');
        console.log(data);
        
        //login 
        this.loginService.loginUser(data.token);
        console.log("localStorage Token: " +localStorage.getItem('token'));

        this.loginService.getCurrentUser().subscribe(
          (user: any)=>{
            this.loginService.setUser(user);
            console.log(user);
            //redirect .... ADMIN : admin-dashboard
            //redirect .... NORMAL : normal-dashboard
            if(this.loginService.getUserRole() == 'ADMIN'){
              //admin dashboard
               // window.location.href='/admin'
               this.router.navigate(['/admin']);
               this.loginService.loginStatusSubject.next(true)
            }else if (this.loginService.getUserRole() == 'NORMAL'){
              //normal user dashboard
              //window.location.href='/user-dashboard'
              this.router.navigate(['/user-dashboard']);
              this.loginService.loginStatusSubject.next(true)
            }else{
              this.loginService.logout();
              location.reload();
            }
          }
        );
      },
      (error) =>{
        console.log('Error !');
        console.log(error);
        this.snack.open("Invalid Details, Try Again!",'',{
          duration:3000,
        })
      }
    );

  }

}
