import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@aguerot/api-interfaces';

@Component({
  selector: 'aguerot-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
