import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  uploadData() {
    console.log('Upload Data');
    // TODO upload text from text area and notify the user
    // Dummy back to home atm
    this.router.navigateByUrl('/home');
  }
}
