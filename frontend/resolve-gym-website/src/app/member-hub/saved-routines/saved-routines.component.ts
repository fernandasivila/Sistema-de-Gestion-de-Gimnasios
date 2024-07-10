import { Component, OnInit } from '@angular/core';
import { RoutineResponse } from '../../models/routine';
import { MemberService } from '../../services/member.service';
import { CommonModule } from '@angular/common';
import { RoutineService } from '../../services/routine.service';

@Component({
  selector: 'app-saved-routines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-routines.component.html',
  styleUrl: './saved-routines.component.css'
})
export class SavedRoutinesComponent implements OnInit {
  routines: any =[]

   fakeMemberResponse = { 
    _id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    routines: [
      {
        _id: '1',
        name: 'Rutina de Acondicionamiento Físico',
        exercises: [
          { _id: '1', name: 'Flexiones', description: 'Ejercicio para fortalecer el pecho y los brazos' },
          { _id: '2', name: 'Sentadillas', description: 'Ejercicio para fortalecer las piernas' }
        ],
        releaseDate:'2023-05-15',
        muscleGroupsSelected: [
          { _id: '1', name: 'Pecho', description: 'Grupos musculares del pecho' },
          { _id: '2', name: 'Piernas', description: 'Grupos musculares de las piernas' }
        ]
      },
      {
        _id: '2',
        name: 'Rutina de Cardio',
        exercises: [
          { _id: '3', name: 'Correr', description: 'Ejercicio cardiovascular para mejorar la resistencia' },
          { _id: '4', name: 'Saltar la cuerda', description: 'Ejercicio para mejorar la coordinación y la resistencia' }
        ],
        releaseDate: new Date('2023-06-20'),
        muscleGroupsSelected: [
          { _id: '3', name: 'Cardio', description: 'Ejercicios cardiovasculares' }
        ]
      }
    ]
  };

  constructor(
    private memberService: MemberService,
    private routinesService: RoutineService
  ){  }
  ngOnInit(): void {
    const userId = localStorage.getItem('userid') || '668e0e4536ff04d0e3f318e4';
    //this.loadRoutines(userId);
    this.routines=this.fakeMemberResponse.routines
  }

  loadRoutines(idMember: string){
    this.memberService.getMemberById(idMember) .subscribe(
      (data:any) => {
        console.log(data)
      this.routines = data.data.routines;
    },
    (error:any)=>{
      console.error("Error trayendo rutinas del socio",error);
    }
  ); 
  }
}
