import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../service/api.service';
import { NavService } from '../service/nav.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  public contactForm!: FormGroup;
  isSubmit = true;
  submittedMessage = '';

  constructor(
    private fb: FormBuilder,
    private toast: NgToastService,
    private about: NavService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
    this.about.show()
  }

  sendMessage(value: any) {
    console.log(value)
    this.isSubmit = true;
    this.submittedMessage = 'Thank You for your Message.';
    this.toast.info({ detail: 'Messsage Submitted', summary: "Thank You", duration: 3000 })
    setTimeout(() => {
      this.isSubmit = false;
    }, 4000);
  }

}
