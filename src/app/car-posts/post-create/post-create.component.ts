import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { EventEmitter } from '@angular/core';
import { CarService } from '../car.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { validateImage } from './validate-image-type.validator';

// interface CarDropdown {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    MatInputModule, 
    MatFormFieldModule, 
    ReactiveFormsModule,
    MatIconModule, 
    MatDividerModule, 
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatSelectModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit{
  selectedCar = '';
  enteredContent = 'ceva';
  selectedModel = '';
  form!: FormGroup;
  private mode = 0;
  carId: any = '';
  car!: any;
  isLoading = false;
  imagePreview!: string;

  carPost = new EventEmitter();

  constructor(public carService: CarService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      'model': new FormControl(null, {validators: [Validators.required]}),
      'description': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(undefined, {validators: [Validators.required], asyncValidators: [validateImage]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('carId')) {
        this.mode = 1;
        this.carId = paramMap.get('carId');
        this.isLoading = true;
        this.car = this.carService.getCar(this.carId)
          .subscribe(carData => {
            this.car = {
              id: carData._id, 
              model: carData.model, 
              description: carData.description,
              imagePath: carData.imagePath
            }
            this.isLoading = false;
            this.form.setValue({
              'model': this.car.model, 
              'description': this.car.description,
              'image': this.car.imagePath
            });
          });
      } else {
        this.mode = 0;
        this.carId = '';
      }
    });
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({'image': file});
      this.form.get('image')?.updateValueAndValidity();
      console.log(file);
      console.log(this.form);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      }
      reader.readAsDataURL(file);
    } else {
      console.error('No file selected or target is not an HTMLInputElement');
    }
  }

  // cars: CarDropdown[] = [
  //   {value: 'volvo', viewValue: 'Volvo'},
  //   {value: 'saab', viewValue: 'Saab'},
  //   {value: 'mercedes', viewValue: 'Mercedes'},
  // ];

  onSaveCar() {
    if(this.form.invalid) {
      return;
    }

    this.isLoading = true;
    if(this.mode === 0) {
      this.carService.addCars(this.form.value.model, this.form.value.description, this.form.value.image);
    } else {
      this.carService.updateCar(
        this.carId, 
        this.form.value.model, 
        this.form.value.description,
        this.form.value.image
      );
    }
    
    this.form.reset();
  }
}
