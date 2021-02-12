import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() control: FormControl = null;
  @Input() inputType: string = 'text';
  @Input() controlType: string = 'input';

  constructor() {}

  ngOnInit(): void {}

  public hasErrors = (): boolean => {
    const { dirty, touched, errors } = this.control;

    return [dirty, touched, errors].every(Boolean);
  };

  public generateMinLengthText = (): string => {
    const { actualLength, requiredLength } = this.control.errors.minlength;

    return `Value you entered is ${actualLength} characters but it must be at least ${requiredLength}`;
  };

  public generateMaxLengthText = (): string => {
    const { actualLength, requiredLength } = this.control.errors.maxlength;

    return `Value you entered is ${actualLength} characters but it can not be longer than ${requiredLength}`;
  };

  public generatePatternErrorText = (): string => {
    return 'Invalid format';
  };

  public generateNonUniqueUsernameErrorText = (): string => {
    return 'Username is taken';
  };
  public generateNoConnectionErrorText = (): string => {
    return 'Currently no internet connection';
  };
  public generateNoEmailErrorText = (): string => {
    return 'No Valid Email';
  };
}
