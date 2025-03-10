import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent {
  currentWeekLabel: string;
  daysInWeek: any[];
  currentTimePosition: number = 0;
  currentDay: string;

  constructor() {
    this.currentWeekLabel = this.getWeekLabel(new Date());
    this.daysInWeek = this.generateWeekDays(new Date());
    this.currentDay = this.formatDate(new Date());
  }

  ngOnInit() {
    this.updateCurrentTimePosition();
    setInterval(() => {
      this.updateCurrentTimePosition();
    }, 60000); // Update every minute
  }

  // Show previous week
  prevWeek() {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);
    this.currentWeekLabel = this.getWeekLabel(currentDate);
    this.daysInWeek = this.generateWeekDays(currentDate);
  }

  // Show next week
  nextWeek() {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    this.currentWeekLabel = this.getWeekLabel(currentDate);
    this.daysInWeek = this.generateWeekDays(currentDate);
  }

  // Generate the week days with sample patient data
  generateWeekDays(date: Date) {
    const startOfWeek = this.getStartOfWeek(date);
    const weekDays = [];
  
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(currentDay.getDate() + i);
      const formattedDate = this.formatDateWithSuffix(currentDay);
      const dayName = this.getDayName(currentDay);
      const dayLabel = `${formattedDate} - ${dayName}`;
      const dayPatients = this.getPatientsForDay(formattedDate);
  
      weekDays.push({
        date: formattedDate,
        label: dayLabel,  // New label with formatted date and name
        patients: dayPatients
      });
    }
  
    return weekDays;
  }

  // Check if this is the current day
  isCurrentDay(day: any) {
    return day.date === this.currentDay;
  }

  updateCurrentTimePosition() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const startOfDay = 8; // Calendar starts at 8 AM
    const totalMinutesInDay = 9 * 60; // Calendar ends at 5 PM (9 hours)
  
    const currentTimeInMinutes = (currentHour - startOfDay) * 60 + currentMinute;
  
    // The calendar grid should have a known height, set according to your design
    const calendarGridHeight = 400; // Adjust this based on the calendar's actual height
    this.currentTimePosition = (currentTimeInMinutes / totalMinutesInDay) * calendarGridHeight;
  }
  
  
  // Helper method to format date as YYYY-MM-DD for comparison
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Helper method to get the week label
  getWeekLabel(date: Date) {
    const startOfWeek = this.getStartOfWeek(date);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
  
    return `${this.formatDateWithSuffix(startOfWeek)} - ${this.formatDateWithSuffix(endOfWeek)}`;
  }

  // Helper method to format date with suffix (e.g., "th", "st", "nd", "rd")
  formatDateWithSuffix(date: Date): string {
    const day = date.getDate();
    const suffix = this.getDaySuffix(day);
    const month = date.toLocaleString('default', { month: 'short' });
    return `${month} ${day}${suffix}`;
  }

  // Helper method to get the day suffix
  getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  // Helper method to get the day name
  getDayName(date: Date): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }

  // Get the start of the week (Sunday)
  getStartOfWeek(date: Date) {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek;
    return new Date(date.setDate(diff));
  }

  // Get hardcoded patients for each day
  getPatientsForDay(date: string) {
    const samplePatients: { [key: string]: { name: string, time: string, type: string }[] } = {
      "Feb 3rd": [
        { name: "Mihai Mihalcean", time: "10:00 AM", type: "consultation" },
        { name: "Jeny Odobescu", time: "02:00 PM", type: "filling" }
      ],
      "Feb 4th": [
        { name: "Ion Ionescu", time: "11:00 AM", type: "root canal" }
      ],
      "Feb 5th": [
        { name: "Bogdan Chis", time: "09:30 AM", type: "extraction" }
      ],
    };
  
    return samplePatients[date] || [];
  }
}