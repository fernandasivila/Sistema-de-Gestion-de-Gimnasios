import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habit-tracker',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './habit-tracker.component.html',
  styleUrl: './habit-tracker.component.css'
})

export class HabitTrackerComponent implements OnInit {
  //registro de asistencias de x miembro
  attendedDays = [1, 3, 5, 8, 10, 13, 15, 19, 22, 24, 25]

  dayGoals = [1, 3, 5] //Lunes, Miercoles y Viernes
  workingDate = new Date(2024, 6, 25)

  calendarInformation = {
    baseDateForCalendar: this.workingDate,
    startDay: new Date((new Date(this.workingDate)).setDate(1)).getDay(),
    amountOfDays: 0,
    calendarDates: new Array<Array<number>>,
    calendarStates: new Array<string>
  }

  private buildCalendarWeeks() : any[] {
    //Construir un array de números de calendario
    let calendarNumbers = Array(this.calendarInformation.startDay)
    for(let date = 1; date <= this.calendarInformation.amountOfDays;date++){
      calendarNumbers.push(date)
    }
    //Dividir el array en un array de arrays de 7 elementos, semanas
    let calendarWeeks :Array<Array<number>> = []
    for(let weekDay = 0; weekDay < calendarNumbers.length; weekDay += 7){
      const week = calendarNumbers.slice(weekDay, weekDay+7)
      calendarWeeks.push(week)
    }
    return calendarWeeks
  }

  private buildCalendarStates() : string[] {
    let dateStates: string[] = []
    let auxDay = this.calendarInformation.startDay
    //Evaluar dias anteriores a la fecha actual
    for (let auxDate = 1; auxDate < this.workingDate.getDate(); auxDate++) {
      const isGoalDay = this.dayGoals.includes(((auxDay) % 7))
      if (this.attendedDays.includes(auxDate)) {
        if(isGoalDay){
          dateStates.push('Presente')
        }
        else{
          dateStates.push('Extra')
        }
      }
      else if (isGoalDay) {
        dateStates.push('Ausente')
      }
      else {
        dateStates.push('')
      }
      auxDay++
    }
    let isGoalDay = this.dayGoals.includes(((this.workingDate.getDate())) % 7)
    //Evaluar dia actual
    if (this.attendedDays.includes(this.workingDate.getDate())) {
      if(isGoalDay){
        dateStates.push('Presente')
      }
      else{
        dateStates.push('Extra')
      }
    }
    else if (this.dayGoals.includes(((auxDay) % 7))) {
      dateStates.push('Neutral')
    }
    else {
      dateStates.push('')
    }
    auxDay++

    //Evaluar dias posteriores
    for (let auxDate = this.workingDate.getDate() + 1; auxDate <= this.calendarInformation.amountOfDays; auxDate++) {
      if (this.dayGoals.includes(((auxDay) % 7))) {
        dateStates.push('Neutral')
      }
      else {
        dateStates.push('')
      }
      auxDay++
    }
    return dateStates
  }

  private getDaysOfMonth(date: Date): number {
    const year = date.getFullYear()
    const month = date.getMonth()
    return (new Date(year, month, 0)).getDate()
  }

  ngOnInit(): void {
    console.log([].constructor(this.calendarInformation.amountOfDays))
    this.calendarInformation['amountOfDays'] = this.getDaysOfMonth(this.workingDate)
    this.calendarInformation['calendarStates'] = this.buildCalendarStates()
    this.calendarInformation['calendarDates'] = this.buildCalendarWeeks()
    console.log(this.calendarInformation['amountOfDays'])
    console.log(this.calendarInformation.calendarDates)
    console.log(this.calendarInformation.calendarStates)
  }

}
