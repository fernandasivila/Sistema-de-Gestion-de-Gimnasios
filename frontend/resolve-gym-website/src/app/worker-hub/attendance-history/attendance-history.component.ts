import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './attendance-history.component.html',
  styleUrl: './attendance-history.component.css'
})
export class AttendanceHistoryComponent implements OnInit {
  dtOptions: ADTSettings = {}
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: '/assets/datatable.spanish.json',
      },
      columns: [
        { title: 'Fecha', data: null },
        { title: 'Hora', data: null },
        { title: 'Usuario', data: null },
        { title: 'Nombre Completo', data: null },
      ],
      columnDefs: [
        {
          targets: [0],
          orderData: [0, 1]
        },
        {
          targets: [1],
          orderData: [1, 0]
        },
      ]
    }
  }
}
