import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { KryptoPriceComponent } from './krypto-price/krypto-price.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { OtpComponent } from './otp/otp.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [

  { path: '', redirectTo:"/homepage", pathMatch:"full"},
  
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'otp',component:OtpComponent},

  {path:'homepage',component:HomepageComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'about-us',component:AboutusComponent},
  {path:'coinDetail/:id',component:KryptoPriceComponent},

  {path:'**',component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
