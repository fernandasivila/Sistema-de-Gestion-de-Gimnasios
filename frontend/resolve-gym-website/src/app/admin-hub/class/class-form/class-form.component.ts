import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../../services/class.service';
import { Class } from '../../../models/class';

@Component({
  selector: 'app-class-form',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule,NgIf],
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.css'
})
export class ClassFormComponent implements OnInit {
  action = 'Registrar'
  classForm!: FormGroup
  
  constructor(
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private classService: ClassService
  ){}

  ngOnInit(): void {
    this.classForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z\\s]+$')]),
      description: new FormControl("", [Validators.required]),
      schedule: new FormControl("", [Validators.required])
    });
    this.route.url.subscribe(
      (data: any) => {
        switch (data[1].path) {
          case 'new':
            this.action = 'Registrar'
            break
          case 'edit':
            this.action = 'Modificar'
            //Logica Modificar
            break
        }
      }
    )
  }

  //getters
  get name() {
    return this.classForm.get('name');
  }

  get description() {
    return this.classForm.get('description');
  }

  get schedule() {
    return this.classForm.get('schedule');
  }

  //validaciones
  validateNameRequired() {
    const name = this.name;
    return name?.errors?.['required'] && (name?.dirty || name?.touched);
  }

  validateNameMinLength() {
    const name = this.name;
    return name?.errors?.['minlength'] && (name?.dirty || name?.touched);
  }

  validateNamePattern() {
    const name = this.name;
    return name?.errors?.['pattern'] && (name?.dirty || name?.touched);
  }

  validateDescriptionRequired() {
    const description = this.description;
    return description?.errors?.['required'] && (description?.dirty || description?.touched);
  }

  validateScheduleRequired() {
    const schedule = this.schedule;
    return schedule?.errors?.['required'] && (schedule?.dirty || schedule?.touched);
  }

  onSubmit() {
    if (this.classForm.valid) {
      
      const formData: Class ={
        name: this.name?.value,
        description: this.description?.value,
        schedule: this.schedule?.value
      }
      console.log(formData)

      if(this.action=="Registrar"){
        this.classService.addClass(formData).subscribe(
          res => {
            console.log("Se registro correctamente una clase",res);
          },
          error => console.error(error)
        )
      }
    } else {
      console.log('Formulario no válido');
    }
  }

}