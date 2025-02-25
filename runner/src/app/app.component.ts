import { Component } from '@angular/core';
import { Page1Component } from './pages/page1.component';

@Component({
  selector: 'app-root',
  imports: [
    Page1Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'runner';
}
