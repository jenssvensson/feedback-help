import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayformComponent } from './payform/payform.component';


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
    component: UploadComponent
  },
  {
    path: 'signup',
    component: UploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
