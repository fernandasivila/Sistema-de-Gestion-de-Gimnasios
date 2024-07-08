import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-exercise-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, JsonPipe, NgFor],
  templateUrl: './exercise-form.component.html',
  styleUrl: './exercise-form.component.css'
})
export class ExerciseFormComponent {
  action = 'Registrar';
  exerciseForm!: FormGroup;
  muscleGroups = [
    {
      _id: 12334,
      name: 'Musculo'
    }
  ]; 
  imageBase64s: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private exerciseS: ExerciseService
  ) { }

  ngOnInit(): void {
    this.exerciseForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      accessory: new FormControl(""),
      instruction: new FormControl("", [Validators.required]),
      difficult: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      muscleGroup: new FormControl("", [Validators.required])
    });

    this.route.url.subscribe((data: any) => {
      switch (data[1].path) {
        case 'new':
          this.action = 'Registrar';
          break;
        case 'edit':
          this.action = 'Modificar';
          // Lógica para cargar datos del ejercicio a editar
          break;
      }
    });
  }

  // Getters para acceder a los controles del formulario
  get name() {
    return this.exerciseForm.get('name');
  }

  get accessory() {
    return this.exerciseForm.get('accessory');
  }

  get instruction() {
    return this.exerciseForm.get('instruction');
  }

  get difficult() {
    return this.exerciseForm.get('difficult');
  }

  get type() {
    return this.exerciseForm.get('type');
  }

  get muscleGroup() {
    return this.exerciseForm.get('muscleGroup');
  }

  // Validaciones
  validateNameRequired() {
    const name = this.name;
    return name?.errors?.['required'] && (name?.dirty || name?.touched);
  }

  validateInstructionRequired() {
    const instruction = this.instruction;
    return instruction?.errors?.['required'] && (instruction?.dirty || instruction?.touched);
  }

  validateDifficultRequired() {
    const difficult = this.difficult;
    return difficult?.errors?.['required'] && (difficult?.dirty || difficult?.touched);
  }

  validateTypeRequired() {
    const type = this.type;
    return type?.errors?.['required'] && (type?.dirty || type?.touched);
  }

  validateMuscleGroupRequired() {
    const muscleGroup = this.muscleGroup;
    return muscleGroup?.errors?.['required'] && (muscleGroup?.dirty || muscleGroup?.touched);
  }

  onFileChange(event: any) {
    this.imageBase64s = []
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageBase64s.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      const formData = this.exerciseForm.value;
      formData.images = this.imageBase64s;
      console.log(formData);
      this.exerciseS.addExercise(formData).subscribe(
        (data:any)=>{
          console.log('Ejercicio guardado correctamente', data);
        },
        (error:any)=>{
          console.error('Error al guardar el ejercicio', error);
        }
      )
    } else {
      console.log('Formulario no válido');
    }
  }

}
