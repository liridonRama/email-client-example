import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from 'src/assets/types/EmailTypes';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent {
  showModal: boolean = false;
  email: Email;

  constructor(
    private authService: AuthService,
    private emailService: EmailService
  ) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      text: '',
      from: `${this.authService.username}@angu.com`,
    };
  }

  onSubmit(email: Email): void {
    this.emailService
      .sendEmail(email)
      .subscribe(() => (this.showModal = false));
  }
}
