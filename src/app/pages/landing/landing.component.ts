import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  constructor(private router: Router) { }

  goingToLogin() {
    this.router.navigateByUrl("/login");
  }

  goingToRegister() {
    this.router.navigateByUrl("/register");
  }
}
