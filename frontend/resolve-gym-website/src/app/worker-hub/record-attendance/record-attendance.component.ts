import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AttendanceRecordService } from '../../services/attendance-record.service';

@Component({
  selector: 'app-record-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './record-attendance.component.html',
  styleUrl: './record-attendance.component.css'
})
export class RecordAttendanceComponent {
  tableAttendance = true

  constructor(private  attendanceService: AttendanceRecordService ){

  }
  buscarAsistencia(){

  }
  onSumbit(){

  }
}
