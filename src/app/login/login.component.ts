import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

user :any={};
msg:any ;


  constructor(private dataService:DataService,private router:Router ) { }

  ngOnInit() {
  }

// User,Admin,Manager LoginMethod

  login(user) {
    console.log(user);
    console.log("login clicked.");
   
    this.dataService.doLogin(user.username, user.password).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem("access_token", JSON.stringify(res));
        
        if(res.authorities == "ADMIN"){
          console.log("admin welcome");
          this.router.navigate(['/admin']);
        }
        if(res.authorities=="USER"){
         console.log("User welcom");
          this.router.navigate(['/user'])
        }
        if(res.authorities=="MANAGER"){
          console.log("manager welcome");
          this.router.navigate(['/manager'])
          
        }

       
      }, (err) => {
        console.log(err);
      }
    );
  } // EndofLogInMethod


}
