import { Component } from '@angular/core';
import { CoachService } from '../services/coach.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  

  constructor(private coachService : CoachService){}

  ngOnInit(){

  }

}
