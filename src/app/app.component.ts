import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { CarCreateComponent } from './car-posts/post-create/car-create.component';
import { CarListComponent } from './car-posts/post-list/car-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent, 
    CommonModule, 
    RouterModule,
    FooterComponent, 
    CarCreateComponent, 
    CarListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'car-marketplace1';
}
