import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule,
    MatSelectModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private authListenerSubs!: Subscription;
  userAuth = false;
  token!: string;

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
 
  ngOnInit() {
    this.userAuth = true;
    // this.userAuth = this.authService.getIsAuth();
    // console.log("user auth after refresh 1 " + this.userAuth);
    console.log("first name in the header " + this.authService.getFirstName());
    // this.firstName = this.authService.getFirstName();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.userAuth = isAuth;
    });

  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
