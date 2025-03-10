import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class SearchPatientComponent {

  // List of patients (hardcoded for now)
  patients = [
    { id: '12345', cnp: '1960102123457', firstName: 'Ion', lastName: 'Popescu', email: 'ion.popescu@example.com', phone: '+40 123 456 789' },
    { id: '12346', cnp: '1970202156781', firstName: 'Maria', lastName: 'Ionescu', email: 'maria.ionescu@example.com', phone: '+40 234 567 890' },
    { id: '12347', cnp: '1980312273456', firstName: 'Andrei', lastName: 'Vasilescu', email: 'andrei.vasilescu@example.com', phone: '+40 345 678 901' },
    { id: '12348', cnp: '1990412389452', firstName: 'Elena', lastName: 'Dobre', email: 'elena.dobre@example.com', phone: '+40 456 789 012' },
    { id: '12349', cnp: '2000522401983', firstName: 'Cristian', lastName: 'Marin', email: 'cristian.marin@example.com', phone: '+40 567 890 123' },
    { id: '12350', cnp: '1990622492784', firstName: 'Gabriela', lastName: 'Popa', email: 'gabriela.popa@example.com', phone: '+40 678 901 234' },
    { id: '12351', cnp: '2000722501451', firstName: 'Mihai', lastName: 'Georgescu', email: 'mihai.georgescu@example.com', phone: '+40 789 012 345' },
    { id: '12352', cnp: '1980822134579', firstName: 'Ioana', lastName: 'Stan', email: 'ioana.stan@example.com', phone: '+40 890 123 456' },
    { id: '12353', cnp: '1970922134765', firstName: 'Radu', lastName: 'Petrescu', email: 'radu.petrescu@example.com', phone: '+40 901 234 567' },
    { id: '12354', cnp: '1991022218993', firstName: 'Larisa', lastName: 'Constantin', email: 'larisa.constantin@example.com', phone: '+40 123 456 789' },
    { id: '12355', cnp: '2001122316544', firstName: 'Alexandru', lastName: 'Iordache', email: 'alexandru.iordache@example.com', phone: '+40 234 567 890' },
    { id: '12356', cnp: '1961222324120', firstName: 'Sorin', lastName: 'Bucur', email: 'sorin.bucur@example.com', phone: '+40 345 678 901' },
    { id: '12357', cnp: '1991322403042', firstName: 'Ana', lastName: 'Negulescu', email: 'ana.negulescu@example.com', phone: '+40 456 789 012' },
    { id: '12358', cnp: '2001422511783', firstName: 'Florin', lastName: 'Munteanu', email: 'florin.munteanu@example.com', phone: '+40 567 890 123' },
    { id: '12359', cnp: '1971522405611', firstName: 'Simona', lastName: 'Lupu', email: 'simona.lupu@example.com', phone: '+40 678 901 234' },
    { id: '12360', cnp: '1991622512458', firstName: 'Victor', lastName: 'Tudor', email: 'victor.tudor@example.com', phone: '+40 789 012 345' },
    { id: '12361', cnp: '1981722634572', firstName: 'Mara', lastName: 'Fisher', email: 'mara.fisher@example.com', phone: '+40 890 123 456' },
    { id: '12362', cnp: '2001822643351', firstName: 'Oana', lastName: 'Albu', email: 'oana.albu@example.com', phone: '+40 901 234 567' },
    { id: '12363', cnp: '1961922751780', firstName: 'Florentina', lastName: 'Costea', email: 'florentina.costea@example.com', phone: '+40 123 456 789' },
    { id: '12364', cnp: '1972022723924', firstName: 'Vasile', lastName: 'Mihaila', email: 'vasile.mihaila@example.com', phone: '+40 123 456 789' },
    { id: '12365', cnp: '1992122834953', firstName: 'Mihaela', lastName: 'Iacob', email: 'mihaela.iacob@example.com', phone: '+40 234 567 890' },
    { id: '12366', cnp: '1982222734879', firstName: 'Dan', lastName: 'Popa', email: 'dan.popa@example.com', phone: '+40 345 678 901' },
    { id: '12367', cnp: '2002322951780', firstName: 'Loredana', lastName: 'Grigore', email: 'loredana.grigore@example.com', phone: '+40 456 789 012' },
    { id: '12368', cnp: '1962423062835', firstName: 'Florin', lastName: 'Munteanu', email: 'florin.munteanu@example.com', phone: '+40 567 890 123' },
    { id: '12369', cnp: '1992523114950', firstName: 'Gheorghe', lastName: 'Toma', email: 'gheorghe.toma@example.com', phone: '+40 678 901 234' },
    { id: '12370', cnp: '2002623205941', firstName: 'Anca', lastName: 'Petrache', email: 'anca.petrache@example.com', phone: '+40 789 012 345' },
    { id: '12371', cnp: '1982723304977', firstName: 'Mihai', lastName: 'Constantin', email: 'mihai.constantin@example.com', phone: '+40 890 123 456' },
    { id: '12372', cnp: '1992823403945', firstName: 'Cosmin', lastName: 'Stefan', email: 'cosmin.stefan@example.com', phone: '+40 901 234 567' },
    { id: '12373', cnp: '2002923512879', firstName: 'Larisa', lastName: 'Enache', email: 'larisa.enache@example.com', phone: '+40 123 456 789' },
    { id: '12374', cnp: '1973023633946', firstName: 'Alina', lastName: 'Lupu', email: 'alina.lupu@example.com', phone: '+40 234 567 890' },
    { id: '12375', cnp: '1993123704973', firstName: 'Adrian', lastName: 'Nistor', email: 'adrian.nistor@example.com', phone: '+40 345 678 901' },
    { id: '12376', cnp: '1983223715870', firstName: 'Irina', lastName: 'Fischer', email: 'irina.fischer@example.com', phone: '+40 456 789 012' },
    { id: '12377', cnp: '2003323822819', firstName: 'Roxana', lastName: 'Georgescu', email: 'roxana.georgescu@example.com', phone: '+40 567 890 123' },
    { id: '12378', cnp: '1993423934820', firstName: 'Valentin', lastName: 'Ionescu', email: 'valentin.ionescu@example.com', phone: '+40 678 901 234' },
    { id: '12379', cnp: '1963524065930', firstName: 'Mihail', lastName: 'Pavel', email: 'mihail.pavel@example.com', phone: '+40 789 012 345' },
    { id: '12380', cnp: '2003424183926', firstName: 'Stefania', lastName: 'Dumitrescu', email: 'stefania.dumitrescu@example.com', phone: '+40 890 123 456' },
    { id: '12381', cnp: '1973624284937', firstName: 'Radu', lastName: 'Lazar', email: 'radu.lazar@example.com', phone: '+40 901 234 567' },
    { id: '12382', cnp: '1993724392874', firstName: 'Teodora', lastName: 'Mihailescu', email: 'teodora.mihailescu@example.com', phone: '+40 123 456 789' },
    { id: '12383', cnp: '2003824472815', firstName: 'Sorina', lastName: 'Ilie', email: 'sorina.ilie@example.com', phone: '+40 234 567 890' }

];

  // Store the filtered list of patients
  filteredPatients = [...this.patients];

  // Store the search query
  searchQuery = '';

  // Filter patients based on the search query
  searchPatients() {
    console.log('Search Query:', this.searchQuery);  // Log search query
    if (this.searchQuery.trim() === '') {
      this.filteredPatients = [...this.patients];  // Reset if query is empty
      console.log('No search query, displaying all patients:', this.filteredPatients);
    } else {
      this.filteredPatients = this.patients.filter(patient =>
        patient.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        patient.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())||
        patient.cnp.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      console.log('Filtered Patients:', this.filteredPatients);  // Log filtered patients
    }
  }
  
}
