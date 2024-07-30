import { Component,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-greeting-service',
  templateUrl: './greeting-service.component.html',
  styleUrls: ['./greeting-service.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GreetingServiceComponent {
  greetingForm: FormGroup;
  greeting: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.greetingForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.greetingForm.invalid) {
      return;
    }

    this.greeting = '';
    this.error = '';
    this.isLoading = true;

    const name = this.greetingForm.value.name;

    this.http.get(`http://localhost:9090/greeter/greet?name=${encodeURIComponent(name)}`, { responseType: 'text' })
      .pipe(
        catchError(err => {
          this.error = 'Si è verificato un errore durante la richiesta del saluto.';
          this.isLoading = false;  // Aggiunto per fermare il loader in caso di errore
          return of(null);
        })
      )
      .subscribe(response => {
        this.isLoading = false;
        if (response) {
          this.greeting = response;
        }
      });
  }
}
