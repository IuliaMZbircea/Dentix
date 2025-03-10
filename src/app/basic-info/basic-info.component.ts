import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CNP } from 'romanian-personal-identity-code-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent {
  patient = {
    id: this.generatePatientID(),
    firstName: '',
    lastName: '',
    dob: '',
    sex: '',
    cnp: '',
    phonePrefix: '+1',
    phone: '',
    email: '',
    address: '',
    placeOfBirth: '',
    age: '',
    allergies: '',
    allergiesNAChecked: false,
    surgeries: '',
    surgeriesNAChecked: false,
    medication: '',
    medicationNAChecked: false,
  };

  cnpValidator = new CNP();
  cnpError: string = '';
  // Method to generate a new patient ID (auto-increment)
  generatePatientID(): string {
    const lastID = localStorage.getItem('lastPatientID') || '1000'; // Starting from 1000 or the last saved ID
    const newID = (parseInt(lastID) + 1).toString();
    localStorage.setItem('lastPatientID', newID); // Save the new ID in localStorage
    return newID;
  }

  // Method to calculate age based on Date of Birth
  calculateAge(dob: string): string {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  }

  extractSex(cnp: string): string {
    const genderDigit = parseInt(cnp.charAt(0));
    if (genderDigit === 1 || genderDigit === 5) {
      return 'Male';
    } else if (genderDigit === 2 || genderDigit === 6) {
      return 'Female';
    }
    return 'N/A';
  }

  onCNPInput() {
    const cnp = this.patient.cnp.trim();
    
    if (cnp.length !== 13 || !/^\d+$/.test(cnp)) {
      this.cnpError = 'CNP must be exactly 13 digits and contain only numbers.';
      return;
    }
  
    if (!this.isValidCNP(cnp)) {
      this.cnpError = 'Invalid CNP. Please check and enter a valid Romanian CNP.';
      return;
    }
  
    this.cnpError = ''; // Clear error if valid
    this.extractCNPInfo(cnp);
  }
  
  isValidCNP(cnp: string): boolean {
    const gender = parseInt(cnp.charAt(0));
    const year = parseInt(cnp.substring(1, 3));
    const month = parseInt(cnp.substring(3, 5));
    const day = parseInt(cnp.substring(5, 7));
    const county = parseInt(cnp.substring(7, 9));
    const controlDigit = parseInt(cnp.charAt(12));
  
    // Gender validation: 1-8 are valid
    if (gender < 1 || gender > 8) {
      return false;
    }
  
    // Validate date of birth
    let fullYear = this.getFullYearFromCNP(gender, year);
    if (!this.isValidDate(fullYear, month, day)) {
      return false;
    }
  
    // Validate county code
    const validCounties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
                           21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 
                           40, 41, 42, 43, 44, 45, 46, 51, 52, 70];
    if (!validCounties.includes(county)) {
      return false;
    }
  
    // Validate control digit (checksum)
    return this.validateControlDigit(cnp, controlDigit);
  }
  validateControlDigit(cnp: string, controlDigit: number): boolean {
    const weights = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
    let sum = 0;
  
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnp.charAt(i)) * weights[i];
    }
  
    const remainder = sum % 11;
    const computedCheckDigit = remainder === 10 ? 1 : remainder;
  
    return computedCheckDigit === controlDigit;
  }
  

  getFullYearFromCNP(gender: number, year: number): number {
    if (gender === 1 || gender === 2) return 1900 + year;  // Born in 1900-1999
    if (gender === 3 || gender === 4) return 1800 + year;  // Born in 1800-1899
    if (gender === 5 || gender === 6) return 2000 + year;  // Born in 2000-2099
    if (gender === 7 || gender === 8) return 1900 + year;  // Foreign residents
    return -1; // Invalid case
  }

  isValidDate(year: number, month: number, day: number): boolean {
    if (month < 1 || month > 12) return false;
  
    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
  }
  
  

  // Extract data from CNP
  extractCNPInfo(cnp: string) {
    if (cnp.length !== 13 || !/^\d+$/.test(cnp)) {
      return;
    }

    // Extract Date of Birth (YYMMDD)
    const yearPrefix = parseInt(cnp.charAt(0));
    let year = cnp.slice(1, 3); // Extract the year part (YY)
    
    // Adjust for century based on the first digit
    if (yearPrefix === 1 || yearPrefix === 2) {
      year = '19' + year; // 1900-1999
    } else if (yearPrefix === 3 || yearPrefix === 4) {
      year = '18' + year; // 1800-1899 (not common but possible)
    } else if (yearPrefix === 5 || yearPrefix === 6) {
      year = '20' + year; // 2000-2099
    }

    const month = cnp.slice(3, 5);
    const day = cnp.slice(5, 7);
    this.patient.dob = `${year}-${month}-${day}`;

    // Calculate Age based on Date of Birth and assign as string
    this.patient.age = this.calculateAge(this.patient.dob);

    // Extract County Code (Place of birth) - Here you can map to specific counties
    const countyCode = parseInt(cnp.slice(7, 9));
    this.patient.placeOfBirth = this.getCountyName(countyCode);

    // Extract Sex
    this.patient.sex = this.extractSex(cnp);
  }

  // Get the county name based on the county code
  getCountyName(countyCode: number): string {
    const counties: { [key: number]: string } = {
      1: 'Alba',
      2: 'Arad',
      3: 'Argeș',
      4: 'Bacău',
      5: 'Bihor',
      6: 'Bistrița-Năsăud',
      7: 'Botoșani',
      8: 'Brașov',
      9: 'Brăila',
      10: 'Buzău',
      11: 'Caraș-Severin',
      12: 'Cluj',
      13: 'Constanța',
      14: 'Covasna',
      15: 'Dâmbovița',
      16: 'Dolj',
      17: 'Galați',
      18: 'Gorj',
      19: 'Harghita',
      20: 'Hunedoara',
      21: 'Ialomița',
      22: 'Iași',
      23: 'Ilfov',
      24: 'Maramureș',
      25: 'Mehedinți',
      26: 'Mureș',
      27: 'Neamț',
      28: 'Olt',
      29: 'Prahova',
      30: 'Satu Mare',
      31: 'Sălaj',
      32: 'Sibiu',
      33: 'Suceava',
      34: 'Teleorman',
      35: 'Timiș',
      36: 'Tulcea',
      37: 'Vaslui',
      38: 'Vâlcea',
      39: 'Vrancea',
      40: 'București',
      41: 'București - Sector 1',
      42: 'București - Sector 2',
      43: 'București - Sector 3',
      44: 'București - Sector 4',
      45: 'București - Sector 5',
      46: 'București - Sector 6',
      51: 'Călărași',
      52: 'Giurgiu',
      47: 'București - Sector 7 (desființat)',
      48: 'București - Sector 8 (desființat)',
      70: 'Cod unic pentru orice înregistrare, indiferent de județul/locul unde a avut loc nașterea',
    };

    return counties[countyCode] || 'Unknown';
  }

  onSubmit() {
    console.log('Patient Info Submitted:', this.patient);
    alert('Patient Info Saved Successfully!');
   
    this.router.navigate(['/diagnosis']);
  }
  constructor(private router: Router) {}
  onSignOut() {
    this.router.navigate(['/sign-in']);
  }
}
