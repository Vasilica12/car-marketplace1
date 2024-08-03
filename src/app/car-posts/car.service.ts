import { Injectable } from "@angular/core";
import { Car } from "./car.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class CarService {
  private cars: Car[] = [];
  private carsUpdated = new Subject<Car[]>();

  getCars() {
    return [...this.cars]; // a copy for the object
  }

  getCarsUpdateListener() {
    return this.carsUpdated.asObservable();
  }

  addCars(cars: Car) {
    this.cars.push(cars);
    this.carsUpdated.next([...this.cars]);
  }
}