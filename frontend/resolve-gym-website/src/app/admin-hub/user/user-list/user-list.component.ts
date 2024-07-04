import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { IDemoNgComponentEventType } from '../../../test/idemo-ng-component-event-type';
import { ActionButtonGroupComponent } from '../../action-button-group/action-button-group.component';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [DataTablesModule, RouterLink, ActionButtonGroupComponent],
  providers: [DatePipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit, AfterViewInit {
  dtOptions: ADTSettings = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>()

  constructor(
    private datePipe: DatePipe,
    private router: Router
  ) {}

  apiResponseExample = [
    {
      "personalInformation": {
        "firstName": "John Wick",
        "lastName": "Doe",
        "dni": "12345678",
        "address": "Dirección",
        "phoneNumber": "12345672",
        "dateOfBirth": "1990-01-01T00:00:00.000Z"
      },
      "img": {
        "data": {
          "type": "Buffer",
          "data": []
        },
        "contentType": "image/png"
      },
      "_id": "6685a0e7d587e0ccac1a9623",
      "username": "john_doe",
      "password": "Password124",
      "email": "john.doe@example.com",
      "role": {
        "_id": "6684bc7220405336cc3abc37",
        "name": "Dueño"
      },
      "__v": 0
    },
    {
      "personalInformation": {
        "firstName": "Maria",
        "lastName": "Smith",
        "dni": "23456789",
        "address": "Otra Dirección",
        "phoneNumber": "23456789",
        "dateOfBirth": "1985-05-15T00:00:00.000Z"
      },
      "img": {
        "data": {
          "type": "Buffer",
          "data": []
        },
        "contentType": "image/jpeg"
      },
      "_id": "6685b1e7d587e0ccac1a9624",
      "username": "maria_smith",
      "password": "Password567",
      "email": "maria.smith@example.com",
      "role": {
        "_id": "6684bc7220405336cc3abc38",
        "name": "Administrador"
      },
      "__v": 0
    },
    {
      "personalInformation": {
        "firstName": "Carlos",
        "lastName": "Johnson",
        "dni": "34567890",
        "address": "Otra Dirección Más",
        "phoneNumber": "34567890",
        "dateOfBirth": "1978-09-23T00:00:00.000Z"
      },
      "img": {
        "data": {
          "type": "Buffer",
          "data": []
        },
        "contentType": "image/png"
      },
      "_id": "6685c2e7d587e0ccac1a9625",
      "username": "carlos_johnson",
      "password": "Password890",
      "email": "carlos.johnson@example.com",
      "role": {
        "_id": "6684bc7220405336cc3abc39",
        "name": "Usuario"
      },
      "__v": 0
    },
    {
      "personalInformation": {
        "firstName": "Lucia",
        "lastName": "Martinez",
        "dni": "45678901",
        "address": "Dirección Diferente",
        "phoneNumber": "45678901",
        "dateOfBirth": "1995-12-30T00:00:00.000Z"
      },
      "img": {
        "data": {
          "type": "Buffer",
          "data": []
        },
        "contentType": "image/gif"
      },
      "_id": "6685d3e7d587e0ccac1a9626",
      "username": "lucia_martinez",
      "password": "Password321",
      "email": "lucia.martinez@example.com",
      "role": {
        "_id": "6684bc7220405336cc3abc40",
        "name": "Moderador"
      },
      "__v": 0
    },
    {
      "personalInformation": {
        "firstName": "Miguel",
        "lastName": "Hernandez",
        "dni": "56789012",
        "address": "Otra Dirección Distinta",
        "phoneNumber": "56789012",
        "dateOfBirth": "2000-07-07T00:00:00.000Z"
      },
      "img": {
        "data": {
          "type": "Buffer",
          "data": []
        },
        "contentType": "image/png"
      },
      "_id": "6685e4e7d587e0ccac1a9627",
      "username": "miguel_hernandez",
      "password": "Password654",
      "email": "miguel.hernandez@example.com",
      "role": {
        "_id": "6684bc7220405336cc3abc41",
        "name": "Usuario"
      },
      "__v": 0
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
          { title: 'Usuario', data: 'username' },
          { title: 'Email', data: 'email' },
          { title: 'Rol', data: 'role.name' },
          { title: 'Nombre', data: 'personalInformation.firstName' },
          { title: 'Apellido', data: 'personalInformation.lastName' },
          { title: 'DNI', data: 'personalInformation.dni' },
          { title: 'Dirección', data: 'personalInformation.address' },
          { title: 'Num. de Télefono', data: 'personalInformation.phoneNumber' },
          {
            title: 'Fecha de Nacimiento',
            data: 'personalInformation.dateOfBirth',
            ngPipeInstance: this.datePipe,
            ngPipeArgs: ['mediumDate','format']
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
      };
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // race condition fails unit tests if dtOptions isn't sent with dtTrigger
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
    this.router.navigate([`/admin-dashboard/users/edit/${this.idEventInstance}`])
  }

  deleteMember(){
    //logica de borrado
  }

  private confirmateDeletion(){
    this.confirmationModal.nativeElement.click()
  }
}
