import { Component, Input, OnInit } from '@angular/core';
import { Email } from 'src/assets/types/EmailTypes';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnInit {
  @Input() email: Email;

  showModal = false;

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n------------ ${this.email.from} wrote:\n>${this.email.text}`,
    };
  }
  onSubmit(email: Email): void {
    this.emailService
      .sendEmail(email)
      .subscribe(() => (this.showModal = false));
  }
}
