import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { EventEmitter } from '@angular/core';
import { Car } from '../car.model';
import { NgForm } from '@angular/forms';
import { CarService } from '../car.service';

interface CarDropdown {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatIconModule, 
    MatDividerModule, 
    MatButtonModule,
    MatSelectModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  selectedCar = '';
  enteredContent = 'ceva';
  selectedModel = '';
  carPost = new EventEmitter();

  constructor(public carService: CarService) {}

  cars: CarDropdown[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ];

  onAddCar(form: NgForm) {
    if(form.invalid) {
      return;
    }
    
    this.carService.addCars(form.value.brand, form.value.model, form.value.description);
    form.resetForm();
  }
}
