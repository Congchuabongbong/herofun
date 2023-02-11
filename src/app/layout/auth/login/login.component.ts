import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import {Profile} from "../../../shared/models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl!: string;
  public profile!: Profile;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue)
      this.router.navigate(['/home']).then();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  get f() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.authenticationService
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        async (data) => {
          await this.authenticationService.getProfile()
            .subscribe(res => {
              res && localStorage.setItem("profile", JSON.stringify(res.data));
            });
          window.location.href = this.returnUrl;
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
