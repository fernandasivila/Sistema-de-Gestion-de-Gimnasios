import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { CommonModule } from '@angular/common';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FeedbackRequest } from '../../models/feedback';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxStarRatingModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm! : FormGroup

  constructor(
    private formBuilder : FormBuilder,
    private feedbackService: FeedbackService
  ){}
  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      description: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
     // score: new FormControl(),
      score: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    })
  }

  get description() { return this.feedbackForm.get('description'); }
  get date() { return this.feedbackForm.get('date'); }
  get score() { return this.feedbackForm.get('score'); }

  validateDescriptionRequired():Boolean {
    const description = this.description;
    return description?.errors?.['required'] && (description?.dirty || description?.touched);
  }
  validateDateRequired():Boolean {
    const date = this.date;
    return date?.errors?.['required'] && (date?.dirty || date?.touched);
  }

  validateScoreRequired(): boolean {
    return !!this.score?.invalid && (this.score?.dirty || this.score?.touched);
  }

 onSubmit(){
  if (this.feedbackForm.valid) {
    const feedback: FeedbackRequest={
      body: this.description?.value,
    date: this.date?.value,
    score: this.score?.value,
    member: localStorage.getItem('userid') || ''
    }
    console.log(feedback)

    this.feedbackService.addFeedback(feedback).subscribe(
      (result:any)=>{
        console.log("Se registro un nuevo comentario", result)
      },
      (error:any)=>{
        console.error("Error al registrar el comentario", error)
        this.feedbackForm.reset() // Resetear el formulario para volver a intentarlo.
      }
    )
  }
 }
}
