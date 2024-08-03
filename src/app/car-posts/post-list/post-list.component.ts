import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

interface Cars {
  brand: string;
  model: string;
  description: string;
}

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  cars: Cars[] = [
    {
      brand: "Toyota",
      model: "Corolla",
      description: "A reliable and fuel-efficient compact sedan."
    },
    {
      brand: "Honda",
      model: "Civic",
      description: "A popular compact car known for its longevity and efficiency."
    },
    {
      brand: "Ford",
      model: "Mustang",
      description: "An iconic American muscle car with powerful performance."
    },
    {
      brand: "Chevrolet",
      model: "Camaro",
      description: "A classic muscle car with a sleek design and strong engine."
    }
  ];
}
