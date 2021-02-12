import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Email, EmailSummary } from 'src/assets/types/EmailTypes';
import { CreateEmailResponse } from 'src/assets/types/AuthTypes';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootUrl: string = 'https://api.angular-email.com';

  constructor(private httpClient: HttpClient) {}

  getEmails(): Observable<EmailSummary[]> {
    return this.httpClient.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }

  getEmail(id: string): Observable<Email> {
    return this.httpClient.get<Email>(`${this.rootUrl}/emails/${id}`);
  }

  sendEmail(email: Email): Observable<CreateEmailResponse> {
    return this.httpClient.post<CreateEmailResponse>(
      `${this.rootUrl}/emails`,
      email
    );
  }
}
