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

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
 
  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.userAuth = isAuth;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
