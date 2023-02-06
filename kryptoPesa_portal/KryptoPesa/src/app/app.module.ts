import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
import { KryptoPriceComponent } from './krypto-price/krypto-price.component';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgChartsModule } from 'ng2-charts';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { DialogComponent } from './dialog/dialog.component';
import { Dialog2Component } from './dialog2/dialog2.component'
import { NetworkInterceptor } from './network.interceptor';
import{TokenInterceptor} from './token.interceptor';

 
export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomepageComponent,
    DashboardComponent,
    AboutusComponent,
    NotfoundComponent,
    FooterComponent,
    KryptoPriceComponent,
    ForgetPasswordComponent,
    OtpComponent,
    DialogComponent,
    Dialog2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
 

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,

    NgChartsModule,
    NgOtpInputModule,
    NgxMatIntlTelInputComponent,
    NgxMaskModule.forRoot(),
    
  ],
  providers: [{
     provide:HTTP_INTERCEPTORS,
     useClass:NetworkInterceptor,
     multi:true
  },
   {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
