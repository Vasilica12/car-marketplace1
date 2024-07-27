import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarPostsComponent } from './car-posts/car-posts.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarPostsComponent, HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'car-marketplace1';
}
