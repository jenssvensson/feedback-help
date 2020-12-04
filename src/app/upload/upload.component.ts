import { AlertService } from './../alert/alert.service';
import { Doc } from './Doc.model';
import { UploadService } from './upload.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './../authentication/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  public user: any;
  public loggedOn: boolean;
  public interactionText: Doc;
  subscription: Subscription;

  constructor(
      private authenticationService: AuthenticationService,
      private uploadService: UploadService,
      private alertService: AlertService)
    {
    this.authenticationService.currentUser.subscribe(x => this.user = x);
    this.authenticationService.isAuthenticated.subscribe(x => this.loggedOn = x);
  }

  ngOnInit(): void {
    this.getDocsData();
  }

  getDocsData() {
    console.log('getDocsData');
    this.subscription = this.uploadService.getDocs().subscribe(
      doc => {
        this.interactionText =  doc as Doc;
      },
      error => {
        const options = {
          autoClose: true,
          keepAfterRouteChange: true
        };
        this.alertService.error(error.error.message, options);
      });
  }

  uploadData() {
    console.log('Upload Data');
    // tslint:disable-next-line:no-shadowed-variable
    console.log(this.interactionText);
    this.uploadService.saveDoc(this.interactionText).subscribe(response => {
      console.log('Doc has been updated in database: ', response);
      const options = {
        autoClose: true,
        keepAfterRouteChange: true
      };
      this.alertService.success('Text saved, well done!!!', options);
    }, error => {
      const options = {
        autoClose: true,
        keepAfterRouteChange: true
      };
      this.alertService.error(error.error.message, options);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
