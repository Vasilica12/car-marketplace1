import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarListComponent } from "./car-posts/post-list/car-list.component";
import { CarCreateComponent } from "./car-posts/post-create/car-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'create', component: CarCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:carId', component: CarCreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule {}