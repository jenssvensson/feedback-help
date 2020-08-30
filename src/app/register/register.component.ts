import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.getToken()) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('(07)[0-9]{8}')]],
        acceptTerms: [false, Validators.requiredTrue],
        contactEarlyMorning: [false],
        contactDay: [false],
        contactEvening: [false]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      console.log('signup in progress');

      const payload = this.registerForm.value;
      payload.contactHours = payload.contactEarlyMorning + ',' + payload.contactDay + ',' + payload.contactEvening;

      this.loading = true;
      this.authenticationService.signUp(payload)
          .pipe(first())
          .subscribe(
              data => {
                console.log(data);
                localStorage.setItem('token', data.token);
                this.authenticationService.isAuthenticatedSubject.next(!!data.token);
                this.authenticationService.getCurrentUser();
                this.router.navigate(['/products'], { queryParams: { registered: true }});
              },
              error => {
                  // TODO add error handling
              });
  }

}
