import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, ParamMap } from '@angular/router';

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
export class PostCreateComponent implements OnInit{
  selectedCar = '';
  enteredContent = 'ceva';
  selectedModel = '';
  private mode = 0;
  carId: any = '';
  car!: any;

  carPost = new EventEmitter();

  constructor(public carService: CarService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('carId')) {
        this.mode = 1;
        this.carId = paramMap.get('carId');
        this.car = this.carService.getCar(this.carId)
          .subscribe(carData => {
            this.car = {id: carData._id, brand: carData.brand, model: carData.model, description: carData.description}
          });
      } else {
        this.mode = 0;
        this.carId = '';
      }
    });
  }

  cars: CarDropdown[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ];

  onSaveCar(form: NgForm) {
    if(form.invalid) {
      return;
    }

    if(this.mode === 0) {
      this.carService.addCars(form.value.brand, form.value.model, form.value.description);
    } else {
      this.carService.updateCar(this.carId, form.value.brand, form.value.model, form.value.description);
    }
    
    form.resetForm();
  }
}
