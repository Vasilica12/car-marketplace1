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
  private carsUpdated = new Subject<{ cars: Car[], carsCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getCars(carsPerPage: number, currentPage: number) {
    // return [...this.cars]; // a copy for the object
    const queryParams = `?pagesize=${carsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, cars: any, maxCars: number}>('http://localhost:3000/api/cars' + queryParams)
      .pipe(map((carData) => {
        return { cars: carData.cars.map((car: any) => {
          return {
            id: car._id,
            model: car.model,
            description: car.description,
            price: car.price,
            telephone: car.telephone,
            imagePath: car.imagePath,
            creator: car.creator
          }
        }), maxCars: carData.maxCars}
      }))
      .subscribe(transfCarsData => {
        this.cars = transfCarsData.cars;
        this.carsUpdated.next({cars: [...this.cars], carsCount: transfCarsData.maxCars});
      });
  }

  getCarsUpdateListener() {
    return this.carsUpdated.asObservable();
  }

  getCar(id: string) {
    return this.http.get<{_id: string, model: string, description: string, price: string, telephone: string, imagePath: string, creator: string}>("http://localhost:3000/api/cars/" + id);
  }

  addCars(model: string, description: string, price: string, telephone: string, image: File) {
    const carData = new FormData();
    carData.append('model', model);
    carData.append('description', description);
    carData.append('price', price);
    carData.append('telephone', telephone);
    carData.append('image', image, model);
    this.http.post<{message: string, car: Car}>("http://localhost:3000/api/cars", carData)
      .subscribe((responseData) => {
        this.router.navigate(["/"]);
        console.log(responseData);
      });
  }

  updateCar(id: string, model: string, description: string, price: string, telephone: string, image: File | string) {
    let carData: Car | FormData;
    if(typeof(image) === 'object') {
      carData = new FormData();
      carData.append('id', id);
      carData.append('model', model);
      carData.append('description', description);
      carData.append('price', price);
      carData.append('telephone', telephone);
      carData.append('image', image, model);
    } else {
      carData = {
        id: id,
        model: model,
        description: description,
        price: price,
        telephone: telephone,
        imagePath: image,
        creator: ''
      };
    }

    this.http.put("http://localhost:3000/api/cars/" + id, carData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteCars(carId: string) {
    return this.http.delete("http://localhost:3000/api/cars/" + carId);
  }
}