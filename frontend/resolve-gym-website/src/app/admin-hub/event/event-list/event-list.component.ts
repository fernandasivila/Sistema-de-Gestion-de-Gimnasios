import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ActionButtonGroupComponent } from '../../action-button-group/action-button-group.component';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../../../test/idemo-ng-component-event-type';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterLink, DataTablesModule, ActionButtonGroupComponent],
  providers:[DatePipe],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit, AfterViewInit {
  
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()

  constructor(private router : Router, private datePipe: DatePipe){}

  apiResponseExample = [
    {
      "_id": "sdf4",
    "name": "Perroton",
    "description": "Colabora con un kilo de alimento y gana meses gratis",
    "date": "2024-01-01T00:00:00.000Z",
    "startTime": "2024-01-01T00:00:00.000Z",
    "finishTime":"2024-01-01T00:30:00.000Z"
    }
  ]

  @ViewChild('confirmationModal') confirmationModal! : ElementRef
  @ViewChild('actionButtons') actionButtons!: TemplateRef<ActionButtonGroupComponent>
  message = ''
  idEventInstance = ''

  ngOnInit(): void {
    setTimeout(() => {
      const self = this;
      this.dtOptions = {
        language: {
          url: '/assets/datatable.spanish.json',
        },
        data: this.apiResponseExample,
        columns: [
          { title: 'Evento', data: 'name' },
          { title:'Descripcion', data:'description'},
          { title:'Fecha', data:'date', ngPipeInstance: this.datePipe, ngPipeArgs: ['mediumDate', 'format']},
          { title: 'Inicia', data:'startTime', ngPipeInstance: this.datePipe, ngPipeArgs: ['shortTime', 'format']},
          { title: 'Termina', 
            data: 'finishTime', 
            render: (data, type, row) => {
             return this.datePipe.transform(data, 'shortTime');
            }
          },
         
          
          {
            title: 'Acciones',
            data: null,
            orderable: false,
            defaultContent: '',
            ngTemplateRef: {
              ref: this.actionButtons,
              context:{
                // needed for capturing events inside <ng-template>
                captureEvents: self.onCaptureEvent.bind(self)
              }
            }
          }
        ]
      }
    })
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next(this.dtOptions);
    }, 200);
  }
  onCaptureEvent(event: IDemoNgComponentEventType) {
    this.idEventInstance = event.data._id
    if(event.cmd == 'edit'){
      this.editMember()
    }
    if(event.cmd == 'delete'){
      this.confirmateDeletion()
    }
    this.message = `Event '${event.cmd}' with data '${JSON.stringify(event.data)}`;
    console.log(this.message)
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  editMember(){
    this.router.navigate([`/admin-dashboard/events/edit/${this.idEventInstance}`])
  }

  deleteMember(){
    //logica de borrado
  }

  private confirmateDeletion(){
    this.confirmationModal.nativeElement.click()
  }

}
