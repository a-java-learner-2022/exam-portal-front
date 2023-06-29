import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    //getting user details from local storage
    this.user =   this.loginService.getUser();

    // calling server for data.
    // this.loginService.getCurrentUser().subscribe(
    //   (data)=>{
    //     this.user = data;
    //   },
    //   (error)=>{
    //     alert('error');
    //   }
    // );
  }



}
