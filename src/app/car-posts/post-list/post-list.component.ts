import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Car } from '../car.model';
import { CarService } from '../car.service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {
  cars : Car [] = [];
  isLoading = false;
  private carSub: Subscription = new Subscription;

  constructor(public carService: CarService) {}

  ngOnInit() {
    this.isLoading = true;
    this.carService.getCars();
    this.carSub = this.carService.getCarsUpdateListener()
      .subscribe((cars: Car[]) => {
        this.isLoading = false;
        this.cars = cars;
        // console.log("this is for the cars:", this.cars);
    });
    
  }

  onDelete(carId: string) {
    this.carService.deleteCars(carId)
  }

  ngOnDestroy() {
    if (this.carSub) {
      this.carSub.unsubscribe();
    }
  }
}
