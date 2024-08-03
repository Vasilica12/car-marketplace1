import { Component } from '@angular/core';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';

@Component({
  selector: 'app-car-posts',
  standalone: true,
  imports: [PostCreateComponent, PostListComponent],
  templateUrl: './car-posts.component.html',
  styleUrl: './car-posts.component.css'
})
export class CarPostsComponent {
  
}
