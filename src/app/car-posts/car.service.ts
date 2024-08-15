import { Injectable } from "@angular/core";
import { Car } from "./car.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class CarService {
  private cars: Car[] = [];
  private carsUpdated = new Subject<Car[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getCars() {
    // return [...this.cars]; // a copy for the object
    this.http.get<{message: string, cars: any}>('http://localhost:3000/api/cars')
      .pipe(map((carData) => {
        return carData.cars.map((car: any) => {
          return {
            id: car._id,
            brand: car.brand,
            model: car.model,
            description: car.description
          }
        })
      }))
      .subscribe(cars => {
        this.cars = cars;
        this.carsUpdated.next([...this.cars]);
      });
  }

  getCarsUpdateListener() {
    return this.carsUpdated.asObservable();
  }

  getCar(id: string) {
    return this.http.get<{_id: string, brand: string, model: string, description: string}>("http://localhost:3000/api/cars/" + id);
  }

  addCars(brand: string, model: string, description: string) {
    const car: Car = {id: '', brand: brand, model: model, description: description};
    this.http.post<{message: string, carId: string}>("http://localhost:3000/api/cars", car)
      .subscribe((responseData) => {
        const id = responseData.carId;
        car.id = id;
        this.cars.push(car);
        this.carsUpdated.next([...this.cars]);
        this.router.navigate(["/"]);
      });
  }

  updateCar(id: string, brand: string, model: string, description: string) {
    const car: Car = {id: id, brand: brand, model: model, description: description};

    this.http.put("http://localhost:3000/api/cars/" + id, car)
      .subscribe(response => {
        const updatedCars = [...this.cars];
        const oldCarIndex = updatedCars.findIndex(c => c.id === car.id);
        updatedCars[oldCarIndex] = car;
        this.cars = updatedCars;
        this.carsUpdated.next([...this.cars]);
        this.router.navigate(["/"]);
      });
  }

  deleteCars(carId: string) {
    this.http.delete("http://localhost:3000/api/cars/" + carId)
      .subscribe(() => {
        const updatedCars = this.cars.filter(car => car.id !== carId);
        this.cars = updatedCars;
        this.carsUpdated.next([...this.cars]);
      })
  }
}