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
            model: car.model,
            description: car.description,
            imagePath: car.imagePath
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
    return this.http.get<{_id: string, model: string, description: string, imagePath: string}>("http://localhost:3000/api/cars/" + id);
  }

  addCars(model: string, description: string, image: File) {
    const carData = new FormData();
    carData.append('model', model);
    carData.append('description', description);
    carData.append('image', image, model);
    this.http.post<{message: string, car: Car}>("http://localhost:3000/api/cars", carData)
      .subscribe((responseData) => {
        const car: Car = {
          id: responseData.car.id, 
          model: model, 
          description: description,
          imagePath: responseData.car.imagePath
        };
        this.cars.push(car);
        this.carsUpdated.next([...this.cars]);
        this.router.navigate(["/"]);
      });
  }

  updateCar(id: string, model: string, description: string, image: File | string) {
    let carData: Car | FormData;
    if(typeof(image) === 'object') {
      carData = new FormData();
      carData.append('id', id);
      carData.append('model', model);
      carData.append('description', description);
      carData.append('image', image, model);
    } else {
      carData = {
        id: id,
        model: model,
        description: description,
        imagePath: image
      };
    }

    this.http.put("http://localhost:3000/api/cars/" + id, carData)
      .subscribe(response => {
        const updatedCars = [...this.cars];
        const oldCarIndex = updatedCars.findIndex(c => c.id === id);
        const car: Car = {
          id: id,
          model: model,
          description: description,
          imagePath: ''
        }
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