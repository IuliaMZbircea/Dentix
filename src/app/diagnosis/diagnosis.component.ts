import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeethMapComponent } from "../teeth-map/teeth-map.component";
import { jsPDF } from 'jspdf';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';  // Import the Router

@Component({
  selector: 'app-diagnosis',
  imports: [FormsModule, CommonModule, TeethMapComponent, NgSelectModule],
  templateUrl: './diagnosis.component.html',
  styleUrl: './diagnosis.component.scss',
  providers: [DatePipe]
})

export class DiagnosisComponent {

  icd10CodeList = [
    { value: 'K02', label: 'K02: Cavities' },
    { value: 'K03', label: 'K03: Excessive brushing of teeth ' },
    { value: 'K05.0', label: 'K05.0: Acute gingivitis' },
    { value: 'K06.0', label: 'K06.0: Gingival recession' },
  ];
  
  selectedICD10Codes: string[] = [];
  currentDate: string;
  patientId: string = '12345'; // Example patient ID

  // Groups of teeth
  group1 = ['11', '12', '13', '14', '15', '16', '17', '18'];
  group2 = ['21', '22', '23', '24', '25', '26', '27', '28'];
  group3 = ['31', '32', '33', '34', '35', '36', '37', '38'];
  group4 = ['41', '42', '43', '44', '45', '46', '47', '48'];

  // Track the status of each tooth
  toothStatus: { [key: string]: number } = {};

  diagnosisNotes: string = '';
  treatmentPlan: string = '';
  isWorkLeavePrescribed: boolean = false;
  leaveDuration: number | null = null;

  constructor(private router: Router, private datePipe: DatePipe) {
    // Initialize the current date and time
    this.currentDate = this.datePipe.transform(new Date(), 'medium')!;
  }

  // Function to handle tooth clicks
  onToothClick(tooth: string): void {
    if (!this.toothStatus[tooth]) {
      this.toothStatus[tooth] = 1; // First click - filling
    } else {
      this.toothStatus[tooth] = (this.toothStatus[tooth] % 4) + 1; // Cycle through 1, 2, 3, 4
    }
  }

  // Function to get the CSS class based on the click count
  getToothClass(tooth: string): string {
    const status = this.toothStatus[tooth];
    switch (status) {
      case 1:
        return 'filling';
      case 2:
        return 'cavity';
      case 3:
        return 'root-canal';
      case 4:
        return 'extraction';
      default:
        return '';
    }
  }

  onWorkLeaveChange(event: any) {
    this.isWorkLeavePrescribed = event.target.checked;
  }

  // Method to generate the PDF
  generatePDF(): void {
    if (!this.isWorkLeavePrescribed || !this.leaveDuration) {
      alert('Please provide the work leave duration.');
      return;
    }

    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(12);

    // Add the title
    doc.text('Work Leave Certificate', 20, 20);
    doc.setFontSize(10);

    // Add Diagnosis Notes
    doc.text('Diagnosis Notes:', 20, 40);
    doc.text(this.diagnosisNotes || 'No diagnosis notes available.', 20, 50);

    // Add Work Leave Information
    if (this.isWorkLeavePrescribed) {
      doc.text('Prescribed Work Leave:', 20, 70);
      doc.text(`Duration: ${this.leaveDuration} days`, 20, 80);
    }

    // Generate the PDF and download
    doc.save('work-leave-certificate.pdf');
  }

  // Handle form submission and navigate to the patient profile
  onSubmit() {
    // After form submission, navigate to the patient profile using the patientId
    this.router.navigate(['/patient-profile', this.patientId]);
  }
  get displayICD10Codes() {
    return this.icd10CodeList.map(item => {
      return { 
        value: item.value, 
        display: `${item.value} - ${item.label}` // Combine ICD code and label
      };
    });
  }
}
