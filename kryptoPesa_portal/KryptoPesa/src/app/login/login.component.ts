import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../Helper/validateForm';
import { AuthService } from '../service/auth.service';
import { NavService } from '../service/nav.service';

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

  constructor(private fb: FormBuilder,
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
      console.log(this.LoginForm.value);
      this.auth.loginUser(this.LoginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.toast.success
              ({ detail: 'Success Message', summary: "Login Completed Successfully!!", duration: 5000 })
            this.LoginForm.reset();
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            this.toast.error
              ({ detail: 'Failed Message', summary: "Login Failed, Something Went wrong!!", duration: 5000 })
          }
        })
    }
  }
}
