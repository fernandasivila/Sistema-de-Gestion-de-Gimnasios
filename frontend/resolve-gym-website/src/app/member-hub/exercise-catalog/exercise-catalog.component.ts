import { Component } from '@angular/core';
import { } from '../../models/exercise';
import { MuscleGroup } from '../../models/muscle-group';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { RoutineCreatorComponent } from '../routine-creator/routine-creator.component';
import { ExcerciseDetailsComponent } from '../excercise-details/excercise-details.component';

@Component({
  selector: 'app-exercise-catalog',
  standalone: true,
  imports: [RoutineCreatorComponent,FontAwesomeModule, ExcerciseDetailsComponent],
  templateUrl: './exercise-catalog.component.html',
  styleUrl: './exercise-catalog.component.css'
})
export class ExerciseCatalogComponent {
  faDumbbell = faDumbbell
  ejerciciosAPI = [
    {
      _id: "1",
      name: "Sentadillas",
      accessory: "Ninguno",
      instruction: "Mantén la espalda recta y baja hasta que los muslos estén paralelos al suelo.",
      difficult: "Principiante",
      type: "Musculación",
      images: [
        {
          data: "base64ImageData1",
          contentType: "image/jpeg"
        },
        {
          data: "base64ImageData2",
          contentType: "image/jpeg"
        }
      ],
      muscleGroup: "1"
    },
    {
      _id: "2",
      name: "Flexiones de pecho",
      accessory: "Ninguno",
      instruction: "Coloca las manos a la altura de los hombros y baja el cuerpo manteniéndolo recto.",
      difficult: "Intermedio",
      type: "Musculación",
      images: [
        {
          data: "base64ImageData4",
          contentType: "image/jpeg"
        }
      ],
      muscleGroup: "2"
    },
    {
      _id: "3",
      name: "Correr",
      accessory: "Ninguno",
      instruction: "Corre a un ritmo constante durante 30 minutos.",
      difficult: "Avanzado",
      type: "Cardio",
      images: [
        {
          data: "base64ImageData6",
          contentType: "image/jpeg"
        }
      ],
      muscleGroup: "3"
    },
    
  ]
}
