import { JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventI } from '../../../models/event';
import { EventService } from '../../../services/event.service';


@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
  action = 'Registrar';
  eventForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService

  ) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
      startTime: new FormControl("", [Validators.required]),
      finishTime: new FormControl("", [Validators.required])
    });

    this.route.url.subscribe((data: any) => {
      switch (data[1].path) {
        case 'new':
          this.action = 'Registrar';
          break;
        case 'edit':
          this.action = 'Modificar';
          // Lógica para cargar datos del evento a editar
          break;
      }
    });
  }

  // Getters para acceder a los controles del formulario
  get name() {
    return this.eventForm.get('name');
  }

  get description() {
    return this.eventForm.get('description');
  }

  get date() {
    return this.eventForm.get('date');
  }

  get startTime() {
    return this.eventForm.get('startTime');
  }

  get finishTime() {
    return this.eventForm.get('finishTime');
  }

  // Validaciones
  validateNameRequired() {
    const name = this.name;
    return name?.errors?.['required'] && (name?.dirty || name?.touched);
  }

  validateDescriptionRequired() {
    const description = this.description;
    return description?.errors?.['required'] && (description?.dirty || description?.touched);
  }

  validateDateRequired() {
    const date = this.date;
    return date?.errors?.['required'] && (date?.dirty || date?.touched);
  }

  validateStartTimeRequired() {
    const startTime = this.startTime;
    return startTime?.errors?.['required'] && (startTime?.dirty || startTime?.touched);
  }

  validateFinishTimeRequired() {
    const finishTime = this.finishTime;
    return finishTime?.errors?.['required'] && (finishTime?.dirty || finishTime?.touched);
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const eventData: EventI = {
        name: this.name?.value,
        description: this.description?.value,
        date: this.date?.value,
        startTime: this.startTime?.value,
        finishTime: this.finishTime?.value
      }
      console.log(eventData);
      if (this.action == "Registrar") {
        this.eventService.addEvent(eventData).subscribe(
          (response) => console.log(response),
          (error) => console.error(error)
        )
      }

    } else {
      console.log('Formulario no válido');
    }
  }
}
