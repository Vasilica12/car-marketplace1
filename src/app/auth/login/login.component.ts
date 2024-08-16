import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading = false;

  onLogin(form: NgForm) {
    console.log(form);
  }
}
