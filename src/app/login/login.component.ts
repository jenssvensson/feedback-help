import { AlertService } from './../alert/alert.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    @Input() redirect = true;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.isAuthenticatedStatus) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    callUser() {
      this.authenticationService.getCurrentUser().subscribe(
        data => {
          console.log('Call user with data', data);
        }
      );
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .subscribe(
                data => {
                  if (data === 'no token found') {
                    const options = {
                      autoClose: true,
                      keepAfterRouteChange: true
                    };
                    this.alertService.error('Login failed, please check email and password', options);
                    this.loading = false;
                    return;
                  }
                  if (this.redirect) {
                    this.router.navigate(['/products']);
                  }
                  this.callUser();
                },
                error => {
                  const options = {
                    autoClose: true,
                    keepAfterRouteChange: true
                  };
                  this.alertService.error(error.error.message, options);
                  this.loading = false;
                });
    }
}
