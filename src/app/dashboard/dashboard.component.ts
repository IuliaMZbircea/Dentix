import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router) {}
  
  navigateToAddPatient() {
    this.router.navigate(['/basic-info']);
  }
  navigateToAddAppointment() {
    this.router.navigate(['/appointment']);
  }
  navigateToSearchPatient(){
    this.router.navigate(['/search-patient']);
  }
  navigateToCalendar(){
    this.router.navigate(['/calendar']);
  }
  onSignOut() {
    this.router.navigate(['/sign-in']);
  }
}
