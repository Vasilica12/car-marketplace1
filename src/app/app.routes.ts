import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarListComponent } from "./car-posts/post-list/car-list.component";
import { CarCreateComponent } from "./car-posts/post-create/car-create.component";

export const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'create', component: CarCreateComponent },
  { path: 'edit/:carId', component: CarCreateComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}