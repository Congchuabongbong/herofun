import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue)
      this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.authenticationService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
