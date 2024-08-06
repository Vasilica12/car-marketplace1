import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { PostCreateComponent } from './car-posts/post-create/post-create.component';
import { PostListComponent } from './car-posts/post-list/post-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent, 
    CommonModule, 
    RouterModule,
    FooterComponent, 
    PostCreateComponent, 
    PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'car-marketplace1';
}
