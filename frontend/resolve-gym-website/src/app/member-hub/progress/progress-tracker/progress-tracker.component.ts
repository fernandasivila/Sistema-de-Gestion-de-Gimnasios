import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js/auto';
import { Progress } from '../../../models/progress';
import { MemberService } from '../../../services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [],
  templateUrl: './progress-tracker.component.html',
  styleUrl: './progress-tracker.component.css'
})
export class ProgressTrackerComponent implements OnInit {

  chart!: Chart;
  progress!: Progress[]

  constructor(
    private memberService: MemberService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadChart()

  }

  loadProgress() {
    let userID = localStorage.getItem('userid')
    if (userID) {
      this.memberService.getMemberById(userID).subscribe(
        (dataMember: any) => {
          this.progress = dataMember.progress

         },
         (error:any)=>{
          console.log(error)
         }
      )
    }

  }

  loadChart() {
    const data = {
      //labels: this.progress.map(p=> new Date(p.date).toLocaleDateString),
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      
      datasets: [{
        label: 'Peso',
        //data: this.progress.map(p=>p.weight),
        data: [80, 80, 65, 65, 60, 50, 56, 55],
        fill: true,
        borderColor: '#ffffff',
        backgroundColor: '#5fc745',
        tension: 0.1,
        borderWidth: 3,
        pointRadius: 4,
        pointBorderColor: '#ffffff',
        pointBackgroundColor: '#5fc745',
        pointHoverBackgroundColor: '#ffffff',
      }]

    };

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false, // Asegura que el gráfico no mantenga un aspecto específico
      scales: {
        x: {
          grid: {
            display: true,
          }
        },
        y: {
          grid: {
            display: true,
          }
        }
      }
    };

    this.chart = new Chart("chart",
      {
        type: 'line' as ChartType,
        data,
        options
      })
  }

  addProgress() {
    this.router.navigate(['progresses/record'])

  }

}
