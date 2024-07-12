import { JsonPipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, HttpClientModule, FormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {
  findMemberForm!: FormGroup;
  generatePaymentForm!: FormGroup;
  monthlyPlans = [
    { _id: '1', title: 'Premium' },
    { _id: '2', title: 'Platinum' },
    { _id: '3', title: 'Elite' }
  ];
  memberFound = false;
  dni: string = "";
  member: any;

  constructor(
    private formBuilder: FormBuilder,
    private memberService : MemberService,
    private monthlyService : 
  ) {}

  ngOnInit(): void {
    this.findMemberForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,8}$')]]
    });

    this.generatePaymentForm = this.formBuilder.group({
      monthlyPlan: ['', Validators.required],
      amount: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  getMember() {
    this.memberFound = false;
    this.memberService.getMemberByDNI(this.dni).subscribe(
      (data: any) => {
        console.log(data)
        this.member = data.data;
        this.memberFound = true;
      },
      (error: any) => {
        console.error("Error al traer el socio", error)
        this.memberFound = false;
      }
    )
  }

  getMonthlyPlans() {
    this.memberService.getMemberByDNI(this.dni).subscribe(
      (data: any) => {
        console.log(data)
        this.member = data.data;
        this.memberFound = true;
      },
      (error: any) => {
        console.error("Error al traer el socio", error)
        this.memberFound = false;
      }
    )
  }

  // Método para generar QR de pago
  onGenerateQR(): void {
    if (this.generatePaymentForm.valid) {
      // Lógica para generar QR de pago
      const paymentDetails = this.generatePaymentForm.value;
      console.log('Detalles de pago:', paymentDetails);
      // Aquí puedes llamar al servicio para generar el QR de pago
    } else {
      console.log('Formulario de generación de pago inválido');
    }
  }
}
