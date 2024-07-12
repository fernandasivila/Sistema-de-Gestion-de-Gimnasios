import { Component, OnInit } from '@angular/core';
import { ExerciseRequest, ExerciseResponse } from '../../models/exercise';
import { MuscleGroup } from '../../models/muscle-group';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { RoutineCreatorComponent } from '../routine-creator/routine-creator.component';
import { ExcerciseDetailsComponent } from '../excercise-details/excercise-details.component';
import { MuscleGroupService } from '../../services/muscle-group.service';
import { CommonModule } from '@angular/common';
import { ExerciseService } from '../../services/exercise.service';
import {Buffer} from "buffer" ;
import { RoutineService } from '../../services/routine.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-catalog',
  standalone: true,
  imports: [RoutineCreatorComponent, FontAwesomeModule, ExcerciseDetailsComponent, CommonModule, FormsModule],
  templateUrl: './exercise-catalog.component.html',
  styleUrl: './exercise-catalog.component.css'
})
export class ExerciseCatalogComponent implements OnInit {
  faDumbbell = faDumbbell
 
  musclesgroups: MuscleGroup[] = []
  ejerciciosTraidos: ExerciseResponse[] = []
  ejerciciosFiltrados: ExerciseResponse[] = []
  routine: ExerciseResponse[] =[]

  //variables de filtrado
  selectedType: string = '';
  selectedMuscleGroup: string = '';
  selectedDifficulty: string = '';
  cargado=true
  
  //para ejercicio detalle
  selectedExercise: ExerciseResponse | null = null;

  constructor(
    private muscleGroupService: MuscleGroupService,
    private exerciseService: ExerciseService,
    private routineService: RoutineService,
  ) { }

  ngOnInit(): void {
    this.loadMuscleGroup()
    this.loadExercises()
  }

  loadMuscleGroup() {
    this.muscleGroupService.getAllMuscleGroups().subscribe(
      data => {
        this.musclesgroups = data.data;
      }, error => {
        console.log(error);
      }
    )
  }
  loadExercises() {
    this.exerciseService.getAllExercises().subscribe(
      result => {
        console.log("EJERCICIOS", result)
        this.ejerciciosTraidos = result.data
        this.ejerciciosTraidos.forEach(
          e => {
            let imagen = this.convertToBase64(e.images[0].data.data, e.images[0].contentType)
            //despues al enviar los ejercicios debo sacar este atributo
            e.imgURL = imagen
          })
          this.cargado=false
      },
      error => {
        console.error(error)
      }
    )
  }
   convertToBase64(data: number[], contentType: string): string {
    const buffer = Buffer.from(data);
    const base64String = buffer.toString('base64');
    return `data:${contentType};base64,${base64String}`;
  }
  addRutina(ejercicio: ExerciseResponse){
    this.routine.push(ejercicio);
    console.log(this.routine)
  }
  filterExercises(){
    this.ejerciciosFiltrados = this.ejerciciosTraidos.filter(
      ejercicio => {
        return (!this.selectedType || ejercicio.type === this.selectedType) &&
        (!this.selectedMuscleGroup || ejercicio.muscleGroup === this.selectedMuscleGroup) &&
        (!this.selectedDifficulty || ejercicio.difficult === this.selectedDifficulty);
      }
    )

  }
  showDetails(ejercicio: ExerciseResponse) {
    this.selectedExercise = ejercicio;
    console.log(this.selectedExercise)
  }
}
