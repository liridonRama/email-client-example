import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  onSubmit(): void {
    if (this.authForm.valid) {
      this.authService.signin(this.authForm.value).subscribe({
        next: () => this.router.navigateByUrl('/inbox'),
        error: (err: HttpErrorResponse) => {
          if (err.status === 422) {
            this.authForm.setErrors({ credentials: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        },
      });
    }
  }

  public getControl = (name: string): FormControl => {
    return this.authForm.get(name) as FormControl;
  };
  constructor(private authService: AuthService, private router: Router) {}
}
