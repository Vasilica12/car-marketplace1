import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Car } from '../car.model';
import { CarService } from '../car.service'; 
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatCardModule, 
    CommonModule, 
    RouterModule, 
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit, OnDestroy {
  cars : Car [] = [];
  private authListenerSubs!: Subscription;
  userAuth = false;
  isLoading = false;
  totalCars = 0;
  carsPerPage = 2;
  currentPage = 1;  
  pageSizeOptions = [1, 2, 5, 10];
  private carSub: Subscription = new Subscription;

  constructor(public carService: CarService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.userAuth = isAuth;
    });
    this.carService.getCars(this.carsPerPage, this.currentPage);
    this.carSub = this.carService.getCarsUpdateListener()
      .subscribe((carsData: {cars: Car[], carsCount: number}) => {
        this.isLoading = false;
        this.totalCars = carsData.carsCount;
        this.cars = carsData.cars;
    });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.carsPerPage = pageData.pageSize;
    this.carService.getCars(this.carsPerPage, this.currentPage);
  }

  onDelete(carId: string) {
    this.isLoading = true;
    this.carService.deleteCars(carId).subscribe(() => {
      this.carService.getCars(this.carsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    if (this.carSub) {
      this.carSub.unsubscribe();
    }
  }
}
