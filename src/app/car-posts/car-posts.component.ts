import { Component } from '@angular/core';
import { PostCreateComponent } from './post-create/post-create.component';

@Component({
  selector: 'app-car-posts',
  standalone: true,
  imports: [PostCreateComponent],
  templateUrl: './car-posts.component.html',
  styleUrl: './car-posts.component.css'
})
export class CarPostsComponent {

}
