import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../../services/exercise.service';
import { ExerciseRequest } from '../../../models/exercise';


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
    private exerciseService: ExerciseService

  ) { }

  ngOnInit(): void {

    this.exerciseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      set: [0, [Validators.required, Validators.min(1)]],
      rep: [0, [Validators.required, Validators.min(1)]],
      accessory: [''],
      instruction: ['', [Validators.required]],
      difficult: ['', [Validators.required]],
      type: ['', [Validators.required]],
      muscleGroup: ['', [Validators.required]]
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
    return this.exerciseForm.get('name') as FormControl;
  }

  get set() {
    return this.exerciseForm.get('set') as FormControl;
  }

  get rep() {
    return this.exerciseForm.get('rep') as FormControl;
  }

  get accessory() {
    return this.exerciseForm.get('accessory') as FormControl;
  }

  get instruction() {
    return this.exerciseForm.get('instruction') as FormControl;
  }

  get difficult() {
    return this.exerciseForm.get('difficult') as FormControl;
  }

  get type() {
    return this.exerciseForm.get('type') as FormControl;
  }

  get muscleGroup() {
    return this.exerciseForm.get('muscleGroup') as FormControl;
  }

  // Validaciones específicas
  validateSetRequired() {
    const set = this.set;
    return set?.errors?.['required'] && (set?.dirty || set?.touched);
  }

  validateSetMin() {
    const set = this.set;
    return set?.errors?.['min'] && (set?.dirty || set?.touched);
  }

  validateRepRequired() {
    const rep = this.rep;
    return rep?.errors?.['required'] && (rep?.dirty || rep?.touched);
  }

  validateRepMin() {
    const rep = this.rep;
    return rep?.errors?.['min'] && (rep?.dirty || rep?.touched);
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
    this.imageBase64s = [];
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
      if(this.action=="Registrar"){
        const formData: ExerciseRequest = this.exerciseForm.value;
      formData.images = this.imageBase64s;
      console.log(formData);
      this.exerciseService.addExercise(formData).subscribe(
        (data: any) => {
          console.log('Ejercicio guardado correctamente', data);
          // Redirigir o hacer alguna acción después de guardar
        },
        (error: any) => {
          console.error('Error al guardar el ejercicio', error);
        }
      );
      }else{
        if(this.action=="Modificar"){
          
        }
      }
      
    } else {
      console.log('Formulario no válido');
    }
  }

}
