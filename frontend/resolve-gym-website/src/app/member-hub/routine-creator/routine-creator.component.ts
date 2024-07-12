import { Component, Input } from '@angular/core';
import { ExerciseResponse } from '../../models/exercise';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RoutineService } from '../../services/routine.service';
import { RoutineRequest } from '../../models/routine';


@Component({
  selector: 'app-routine-creator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routine-creator.component.html',
  styleUrl: './routine-creator.component.css'
})
export class RoutineCreatorComponent {
  @Input() routine: ExerciseResponse[] = [];
  routineCreate!: RoutineRequest
//hacer binding con esto
  nameRoutine=''
  muscleGroupName: String[] = []

  constructor(
    private routineService: RoutineService
  ){

  }

  getMuscleGroupName(){
   this.routine.forEach(
      ejercicio=>{
        this.muscleGroupName.push(ejercicio.muscleGroup)
      }
    )
  }

  createRoutine(){
    this.getMuscleGroupName();
    
    this.routineCreate = {
      name: this.nameRoutine,
      exercises: this.routine,
      releaseDate: new Date(),
      muscleGroupsSelected: this.muscleGroupName
    }

    console.log(this.routineCreate);

    this.routineService.addRoutine(this.routineCreate).subscribe(
      result =>{
        console.log('Rutina creada correctamente', result);
      },error=>{
        console.error('Error al crear la rutina', error);
      }
    )
  }
  borrarEjercicio(indice: number){
    this.routine.splice(indice, 1)
  }

}
