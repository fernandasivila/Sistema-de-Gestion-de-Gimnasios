import { Component, OnInit } from '@angular/core';
import { RoutineResponse } from '../../models/routine';
import { MemberService } from '../../services/member.service';
import { CommonModule } from '@angular/common';
import { RoutineService } from '../../services/routine.service';

@Component({
  selector: 'app-saved-routines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-routines.component.html',
  styleUrl: './saved-routines.component.css'
})
export class SavedRoutinesComponent implements OnInit {
  routines: any =[]

  constructor(
    private memberService: MemberService,
    private routinesService: RoutineService
  ){  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userid') || '6690195e9baea98ed03a162f';
    this.loadRoutines(userId);
  }

  loadRoutines(idMember: string){
    this.memberService.getRoutinesByMember(idMember) .subscribe(
      (data:any) => {
        console.log(data)
      this.routines = data.data.routines;
    },
    (error:any)=>{
      console.error("Error trayendo rutinas del socio",error);
    }
  ); 
  }
}
