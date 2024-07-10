import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, Injectable } from '@angular/core';

type calendarDay = {
  date: number,
  wasPresent: boolean,
  isToday: boolean
} | null

type calendarWeek = {
  days: calendarDay[],
  daysAttended: number,
  goalReached: boolean,
  isCurrentWeek: boolean
}

@Component({
  selector: 'app-habit-tracker',
  standalone: true,
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './habit-tracker.component.html',
  styleUrl: './habit-tracker.component.css'
})

export class HabitTrackerComponent implements OnInit {
  //registro de asistencias de x miembro
  attendedDays = [1, 3, 5, 8, 13, 15, 19, 22, 24, 25]
  dayGoals = 3
  workingDate = new Date(2024,7,10)

  calendar : calendarWeek[] = []

  ngOnInit(): void {
      this.calendar = this.buildCalendar(this.workingDate, this.attendedDays, this.dayGoals)
  }

  private buildCalendar(date: Date, attendedDays: number[], attendedDaysGoal: number): calendarWeek[] {
    const calendarCurrentDate = date.getDate()
    const firstDateDay = (new Date(date.getFullYear(), date.getMonth(), 1)).getDay() // 0: Domingo, 1: Lunes, ..., 6: Sábado
    const daysInMonth = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate()

    let calendar: calendarWeek[] = []
    let week: calendarWeek = {
      days:new Array<calendarDay>(firstDateDay).fill(null),
      daysAttended: 0,
      goalReached: false,
      isCurrentWeek: false,
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let wasPresent = attendedDays.includes(day)

      if (wasPresent) {
        week.daysAttended++
      }

      let isToday = (day == calendarCurrentDate)

      if (isToday) {
        week.isCurrentWeek = true
      }

      let dayAux: calendarDay = {
        date: day,
        wasPresent: wasPresent,
        isToday: isToday
      }

      week.days.push({...dayAux})

      if (week.days.length === 7) {
        week.goalReached = week.daysAttended >= attendedDaysGoal
        calendar.push({...week})
        week.days = []
        week.daysAttended = 0
        week.goalReached = false
        week.isCurrentWeek = false
      }
    }

    console.log(calendar)
    return calendar
  }
}
