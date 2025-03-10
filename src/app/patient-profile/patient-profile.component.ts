import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToothChartComponent } from "../tooth-chart/tooth-chart.component";

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  imports: [CommonModule, ToothChartComponent],
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  patientId: string | null = null;
  patient: any = {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the patient ID from the route parameter
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.fetchPatientDetails(this.patientId);
  }

  fetchPatientDetails(id: string | null) {
    if (id) {
      // Fetch patient details by ID (this could be an API call or service)
      // For now, I'll just mock the patient data
      this.patient = this.getPatientById(id);
    }
  }

  // Mock patient data
  getPatientById(id: string) {
    // Normally, you'd fetch data from a service here.
    return {
      id: id,  // Unique identifier
      fullName: 'Vasile Mihaila',  // Full name
      cnp: '1972022723924',  // CNP number with search formula for international patients
      dob: '1972-02-27',  // Date of birth (auto-filled)
      age: 53,  // Age auto-calculated based on date of birth
      sex: 'Male',  // Autofilled based on name or other data
      knownAllergies: 'Lidocaine',  // Integrate allergy database for known allergies
      previousSurgeriesOrConditions: 'Appendectomy',  // Text box for previous surgeries or conditions
      currentMedicationTreatment: 'Anticoagulant',  // Integrate medication database for current medications
      medicalConditions: 'Deep vein thrombosis (DVT)',  // Text box for family medical history
      phoneNumber: '+40 123 456 789',
      homeAddress: 'Intrarea iederei nr.1, Timisoara, Romania',  // Prefix selection and validation for phone number
      activeDentalIssues: ['Cavity', 'Gum disease'],  // Checkboxes or dropdown for active dental issues
      treatmentHistory: [
        {
          date: '2023-05-01',
          treatment: 'Filling',
          dentist: 'Dr. Ana Popescu',
          notes: 'Routine filling for a decayed tooth'
        },
        {
          date: '2022-10-15',
          treatment: 'Root Canal',
          dentist: 'Dr. Radu Ionescu',
          notes: 'Root canal performed for infected molar'
        }
      ],  // Timeline display for past treatments with notes
      xRays: ['xray_image_1.jpg', 'xray_image_2.jpg'],  // Files attached for X-rays
      diagnosis: 'Resolved',  // Diagnosis status (resolved or in progress)
      prescribedTreatments: ['Cleaning', 'Filling'],  // Checkbox for prescribed treatments
      appointmentHistory: [
        {
          date: '2024-01-10',
          time: '10:00 AM',
          dentist: 'Dr. Ana Popescu'
        },
        {
          date: '2023-12-15',
          time: '03:00 PM',
          dentist: 'Dr. Radu Ionescu'
        }
      ],  // Appointment history with dates, times, and dentist names
      email: 'vasile.mihaila@example.com',  // Email with validation
      upcomingAppointment: {
        date: '2025-02-25',
        time: '11:00 AM',
        reason: 'Filling - Tooth 46'
      },  // Upcoming appointment details with date, time, and reason
      additionalDetails: '',  // Checkbox or text box for additional info
      rescheduleCancelLink: '/appointment',  // Button or redirect for rescheduling/canceling
    };
  }
  
  
}
