import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GreetingServiceComponent } from './greeting-service/greeting-service.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GreetingServiceComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Correzione: `styleUrls` (plurale)
})
export class AppComponent {
  title = 'greeting-service';
}
