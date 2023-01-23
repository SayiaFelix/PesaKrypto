import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  otp!: string; showOtpComponent = true;
  inputDigitLeft: string = 'Verify Code';
  btnStatus: string = 'button_1'
  Otp!: string;
  otpUser!: any;

  constructor(
    private auth: AuthService,
    private toast: NgToastService,
    private router: Router,
    private http: HttpClient
  ) { }

  public configOptions = {
    length: 4,
    inputClass: 'digit-otp',
    allowNumbersOnly: true,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "*",
    // inputStyles: { width: "50px", height: "50px", },
    // containerClass:'d-flex justify-content-between'
  }

  ngOnInit(): void {
  }

  onOtpChange(event: any) {
    this.otp = event
    if (this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " Digits Left";
    }
    if (this.otp.length == this.configOptions.length) {
      this.inputDigitLeft = "Let's Go!!";
      this.btnStatus = 'auth'
      this.router.navigate(['login']);
    }
    if (this.Otp === this.otp) {
      this.auth.requestOtp(this.Otp)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['login']);
        })
    }
  }
  validateOtp() {
    if (this.Otp === this.otp) {
      this.http.get<any>(`https://cryptopesa.herokuapp.com/CryptoApp/Onboard/confirm?code=${this.Otp}`)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['login']);
        })
    }
  }
  // if (otp.length == 4) { this.validateOtp(); } }
  //  setVal(val) { this.ngOtpInput.setValue(val); } 
  // onConfigChange() { this.showOtpComponent = false;
  //  this.otp = null; 
  // setTimeout(() => { this.showOtpComponent = true; }, 0); } 
  // validateOtp() {
  // write your logic here to validate it, you can integrate sms API here if you want } 

}


