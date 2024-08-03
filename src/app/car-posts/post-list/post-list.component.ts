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
  private carSub: Subscription = new Subscription;

  constructor(public carService: CarService) {}

  ngOnInit() {
    this.cars = this.carService.getCars();
    this.carSub = this.carService.getCarsUpdateListener()
      .subscribe((cars: Car[]) => {
        this.cars = cars;
    });
  }

  ngOnDestroy() {
    this.carSub.unsubscribe();
  }
}
