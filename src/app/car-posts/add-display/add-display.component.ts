import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { CarService } from '../car.service';

@Component({
  selector: 'app-add-display',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatCardModule, 
    CommonModule, 
    RouterModule, 
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  templateUrl: './add-display.component.html',
  styleUrl: './add-display.component.css'
})
export class AddDisplayComponent implements OnInit {
  carId: any = '';
  car!: any;
  isLoading = false;

  constructor(public carService: CarService, public route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.carId = paramMap.get('carId');
        this.car = this.carService.getCar(this.carId)
          .subscribe(carData => {
              this.car = {
                id: carData._id, 
                model: carData.model, 
                description: carData.description,
                price: carData.price,
                telephone: carData.telephone,
                imagePath: carData.imagePath,
                creator: carData.creator
              }
            this.isLoading = false;
          });
    });
  }
}


