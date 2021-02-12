import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (
    formControl: FormControl
  ): Observable<ValidationErrors | null> => {
    return this.authService.usernameAvailable(formControl.value).pipe(
      map((res) => {
        if (res.available) {
          return null;
        }
      }),
      catchError((err) => {
        if (err.username) {
          return of({ noConnection: true });
        }
        return of({ nonUniqueUsername: true });
      })
    );
  };
}
