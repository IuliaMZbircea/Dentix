import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component'; // Import SignInComponent
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { HelpDocComponent } from './help-doc/help-doc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { NgModule } from '@angular/core';
import { SchedulePatientComponent } from './schedule-appointment/schedule-appointment.component';
import { ToothChartComponent } from './tooth-chart/tooth-chart.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { TeethMapComponent } from './teeth-map/teeth-map.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'search-patient', component: SearchPatientComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'basic-info', component: BasicInfoComponent },
  { path: 'help-doc', component: HelpDocComponent },
  { path: 'patient-profile/:id', component: PatientProfileComponent },
  { path: 'appointment', component: SchedulePatientComponent },
  { path: 'tooth-chart', component: ToothChartComponent},
  { path: 'teeth-map', component: TeethMapComponent},
  { path: 'diagnosis', component: DiagnosisComponent},
  { path: 'calendar', component: CalendarViewComponent},
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}