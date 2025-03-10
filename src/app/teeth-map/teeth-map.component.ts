import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ToothChartComponent } from "../tooth-chart/tooth-chart.component";

@Component({
  selector: 'app-teeth-map',
  imports: [FormsModule, CommonModule],
  templateUrl: './teeth-map.component.html',
  styleUrl: './teeth-map.component.scss'
})
export class TeethMapComponent {
  toothStates: { [key: string]: number } = {}; 
  toothColors: { [key: string]: string } = {}; 

  // Array of colors for different states
  colors = {
    healthy: '#ffffff',
    cavity: '#9c4431',
    filling: '#ff7e7e',
    rootCanal: '#f13d17',
    extraction: '#47403e'
  };

  toggleToothColor(toothId: string): void {
    if (!this.toothStates[toothId]) {
      this.toothStates[toothId] = 0; 
      this.toothColors[toothId] = this.colors.healthy; 
    }

    this.toothStates[toothId] = (this.toothStates[toothId] + 1) % 5;

    switch (this.toothStates[toothId]) {
      case 1:
        this.toothColors[toothId] = this.colors.cavity; // Cavity color on 1st click
        break;
      case 2:
        this.toothColors[toothId] = this.colors.filling; // Filling color on 2nd click
        break;
      case 3:
        this.toothColors[toothId] = this.colors.rootCanal; // Root Canal color on 3rd click
        break;
      case 4:
        this.toothColors[toothId] = this.colors.extraction; // Extraction color on 4th click
        break;
      default:
        this.toothColors[toothId] = this.colors.healthy; // Return to healthy after 4th click
        break;
    }
  }
  showAdultTeeth: boolean = true; // Default: Show adult teeth

  selectTeethType(isAdult: boolean) {
    this.showAdultTeeth = isAdult;
  }
}