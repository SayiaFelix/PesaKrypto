import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../Helper/validateForm';
import { AuthService } from '../service/auth.service';
import { NavService } from '../service/nav.service';
import {HttpParams} from '@angular/common/http';  


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public LoginForm!: FormGroup;
  visible: boolean = false;
  changepass: boolean = true;

  viewpass() {
    this.visible = !this.visible;
    this.changepass = !this.changepass;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private log: NavService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      username: ['', [Validators.required]],
      pin: ['', Validators.required]
    });
    this.log.show()
  }

  login() {
    if (this.LoginForm.valid) {
      // send obj to db
     
      const model = new HttpParams()
          .set('grant_type', 'pin')
          .set('username',  this.LoginForm.get('username')?.value.trim())  
          .set('pin', this.LoginForm.get('pin')?.value.trim());

      console.log(this.LoginForm.value);
      this.auth.loginUser(model)
        .subscribe({
          next: (res:any) => {
            if (res.status==200){
            console.log(res)
            console.log(res.message)
            this.auth.storedToken(res.access_token)
            this.toast.success
                  ({ detail: 'Success Message', summary: "Login Successfully!!", duration: 5000 })
            this.LoginForm.reset();
            this.router.navigate(['dashboard']);

            }else{
               console.log(res.status)
               console.log(res.message)
               this.toast.error
               ({ detail: 'Failed Message', summary: "Login Failed, Try Again", duration: 5000 })
               this.LoginForm.reset();
            }
          },
          error: (err) => {
            this.toast.error
              ({ detail: 'Failed Message', summary: "Login Failed, Something Went wrong!!", duration: 5000 })
          }
        })
    }else{
      ValidateForm.validateAllFormFields(this.LoginForm)
      alert('Your Form is Empty')
    }
  }
}
