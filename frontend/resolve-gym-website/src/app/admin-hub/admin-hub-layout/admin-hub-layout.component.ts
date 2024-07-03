import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarPlus, faDumbbell, faFireFlameCurved, faGraduationCap, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-hub-layout',
  standalone: true,
  imports: [FontAwesomeModule, RouterOutlet],
  templateUrl: './admin-hub-layout.component.html',
  styleUrl: './admin-hub-layout.component.css'
})
export class AdminHubLayoutComponent {
  faDumbbell = faDumbbell
  faFireFlameCurved = faFireFlameCurved
  faPersonChalkboardfa = faPersonChalkboard
  faGraduationCap = faGraduationCap
  faCalendarPlus = faCalendarPlus
}
