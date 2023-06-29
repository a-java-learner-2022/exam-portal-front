import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/services/model.user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

})
export class SignupComponent implements OnInit {


  constructor(private userService: UserService, private _snackBar: MatSnackBar ) { }

  // public user = {
  //   username: '',
  //   password: '',
  //   firstname: '',
  //   lastname: '',
  //   email: '',
  //   phone: ''
  // };

  user: User  ={
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: 0
  };

  ngOnInit(): void {


  }

  formSubmit() {
    // alert('submit')
    if (this.user.username == null || this.user.username == '') {
     this._snackBar.open('username is required.', '',{
      duration: 3000,
     }

     )
      return;
    }
    //addUser: userService
  this.userService.addUser(this.user).subscribe(
      (data:any) => {
        console.log(data)
        //alert("success")
        Swal.fire('Successfully Registered.','User id ' + data.userId,'success');
       
      },
      (error) => {
        console.log(error)
        this._snackBar.open('username is already chosen, try different one', '',{
          duration:3000,
        })
      }
    );
  }

}
