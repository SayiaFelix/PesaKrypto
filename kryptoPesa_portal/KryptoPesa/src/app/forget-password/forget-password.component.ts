import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../Helper/validateForm';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public forgetPassForm!: FormGroup;

  constructor
    (
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router,
      private toast: NgToastService,
      private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.forgetPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  forgetPass() {
    if (this.forgetPassForm.valid) {
      console.log(this.forgetPassForm.value);
      this.http.post<any>("http://localhost:3000/users/", this.forgetPassForm.value)
        .subscribe(res => {
          this.toast.success({ detail: 'Success Message', summary: "Email Added Successfully!!", duration: 5000 })
          this.forgetPassForm.reset();
          this.router.navigate(['sign']);
        }, err => {
          this.toast.error({ detail: 'Failed Message', summary: "Email Failed, Something Went wrong!!", duration: 5000 })

        })
    } else {
      ValidateForm.validateAllFormFields(this.forgetPassForm)
      alert('Your Form is Empty')
    }
  }
}
