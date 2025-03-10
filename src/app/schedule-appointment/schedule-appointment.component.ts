import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./schedule-appointment.component.scss']
})
export class SchedulePatientComponent implements OnInit {

  patientId: string = '12345';

  // Patients data
  patients = [
    { id: '1', fullName: 'John Doe' },
    { id: '2', fullName: 'Jane Smith' },
    { id: '3', fullName: 'Robert Brown' },
    // Add more patients if necessary
  ];

  // Initial appointment form data
  appointment = {
    patientId: '',
    date: '',
    time: '',
    reason: '',
    type: 'Check-up', // Default appointment type
    notes: ''
  };

  // Available time slots (to be updated dynamically)
  availableTimeSlots: string[] = [];

  // Time range for the day
  startOfDay = 8; // Start time at 8:00 AM
  endOfDay = 17;  // End time at 5:00 PM


  constructor(private router: Router) { }


  ngOnInit(): void {
    // Initially populate the time slots for a default type
    this.generateTimeSlots('Check-up');
  }

  // Function to handle appointment type changes and adjust time slots
  onTypeChange() {
    this.generateTimeSlots(this.appointment.type);
  }

  // Helper function to generate available time slots based on appointment type
  generateTimeSlots(appointmentType: string) {
    const slotDuration = this.getDurationByType(appointmentType);
    const slots = [];
    let currentTime = new Date();
    currentTime.setHours(this.startOfDay, 0, 0, 0);  // Set currentTime to 8:00 AM

    // Generate time slots based on slot duration
    while (currentTime.getHours() < this.endOfDay) {
      const slotTime = this.formatTime(currentTime);
      slots.push(slotTime);

      // Increase time by the slot duration (in minutes)
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
    }

    // Set available time slots for the dropdown
    this.availableTimeSlots = slots;
  }

  // Function to get the duration of each appointment type in minutes
  getDurationByType(type: string): number {
    switch (type) {
      case 'Check-up':
        return 30;  // 30 minutes
      case 'Cleaning':
        return 30;  // 30 minutes
      case 'Fillings':
        return 45;  // 45 minutes
      case 'Root Canal':
        return 60;  // 60 minutes
      case 'Extraction':
        return 90;  // 90 minutes
      default:
        return 30;
    }
  }

  // Helper function to format time in HH:mm format
  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  
  // Submit the form
  onSubmit() {
    if (this.appointment.patientId && this.appointment.date && this.appointment.time && this.appointment.reason) {
      alert('Appointment scheduled successfully!');
      // Typically call an API to save the appointment
      console.log(this.appointment);
      this.router.navigate(['/patient-profile', this.patientId]);
    } else {
      alert('Please fill in all required fields.');
    }
  }
  onSignOut() {
    this.router.navigate(['/sign-in']);
  }

}