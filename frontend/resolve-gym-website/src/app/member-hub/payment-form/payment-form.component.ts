import { JsonPipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../../services/member.service';
import { MonthlyPlanService } from '../../services/monthly-plan.service';
import { MonthlyPlan } from '../../models/monthly-plan';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, HttpClientModule, FormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {
  monthlyPlans: MonthlyPlan[] = [];
  memberFound = false;
  dni: string = "";
  member: any;
  monthlyPlanId = "";
  monthlyPlanSelected : any;
  monthlyPlanSelectedId = "";
  today = new Date();
  dueDate = new Date().setDate(this.today.getMonth() + 1);

  constructor(
    private memberService : MemberService,
    private monthlyService : MonthlyPlanService
  ) {}

  ngOnInit(): void {
  }

  getMember() {
    this.memberFound = false;
    this.memberService.getMemberByDNI(this.dni).subscribe(
      (data: any) => {
        console.log(data)
        this.member = data.data;
        this.monthlyPlanId = this.member.monthlyPlan
        this.getMonthlyPlan(this.monthlyPlanId);
        this.getMonthlyPlans();
        this.memberFound = true;
      },
      (error: any) => {
        console.error("Error al traer el socio", error)
        this.memberFound = false;
      }
    )
  }

  getMonthlyPlan(id : string){
    this.monthlyService.getMonthlyPlanById(id).subscribe(
      (data: any) => {
        console.log(data)
        this.monthlyPlanSelected = this.member.monthlyPlan
      },
      (error: any) => {
        console.error("Error al traer el plan", error)
        this.memberFound = false;
      }
    )
  }

  getMonthlyPlans() {
    this.monthlyService.getAllMonthlyPlans().subscribe(
      (data: any) => {
        console.log(data)
        this.monthlyPlans = data.data;
      },
      (error: any) => {
        console.error("Error al traer planes", error)
      }
    )
  }

  // Método para generar QR de pago
  onGenerateQR(): void {
  }
}
