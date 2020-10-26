import { AuthenticationService } from './../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public user: any;
  public loggedOn: boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.user = x);
    this.authenticationService.isAuthenticated.subscribe(x => this.loggedOn = x);
  }

  ngOnInit(): void {
  }

  uploadData() {
    console.log('Upload Data');
    // TODO upload text from text area and notify the user
  }
}
