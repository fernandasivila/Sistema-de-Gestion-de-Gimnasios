import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ActionButtonGroupComponent } from '../../action-button-group/action-button-group.component';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../../../test/idemo-ng-component-event-type';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [DataTablesModule, RouterLink, ActionButtonGroupComponent],
  providers: [],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css'
})
export class ClassListComponent implements OnInit, AfterViewInit {

  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()
  
  constructor(private router: Router){}

  apiResponseExample =[
    {
      "_id": "6685a0e7d587e0ccac1a9623",
      "name":"Crossfit",
      "description":"entrena tu cuerpo",
      "schedule":"turno mañana, tarde, noche",

    },
    {
      "_id": "6685a0e7d587e0ccac1a9625",
      "name":"Funcional en trampolin",
      "description":"qsy se feliz",
      "schedule":"turno mañana"
    }
  ]

  @ViewChild('confirmationModal') confirmationModal! : ElementRef
  @ViewChild('actionButtons') actionButtons!: TemplateRef<ActionButtonGroupComponent>
  message = ''
  idEventInstance = ''

  ngOnInit(): void {
    setTimeout(()=>{
      const self = this;
      this.dtOptions = {
        language: {
          url: '/assets/datatable.spanish.json',
        },
        data: this.apiResponseExample,
        columns: [
          { title: 'Clase', data: 'name'},
          { title:'Descripcion', data:'description'},
          { title:'Horario', data:'schedule'},
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
    }

    )
  }
  ngAfterViewInit() {
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
    this.router.navigate([`/admin-dashboard/classes/edit/${this.idEventInstance}`])
  }

  deleteMember(){
    //logica de borrado
  }

  private confirmateDeletion(){
    this.confirmationModal.nativeElement.click()
  }


}
