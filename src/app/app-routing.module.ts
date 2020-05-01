import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayformComponent } from './payform/payform.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'payform',
    component: PayformComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
