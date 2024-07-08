import { formatDate, JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../models/role';
import { HttpClientModule } from '@angular/common/http';
import { UserRequest, UserResponse } from '../../../models/user';
import { error } from 'jquery';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, HttpClientModule],

  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  action = 'Registrar'
  item = 'Usuario'
  userId = ''

  dateOfBirthPost = new Date()
  rolesPost = [
    { id: 1, title: 'Empleado' },
    { id: 2, title: 'Socio' }
  ]
  imageBase64post: string | ArrayBuffer | null = null

  monthlyPlans = [
    { id: 1, title: 'Premium' },
    { id: 2, title: 'Platinum' },
    { id: 3, title: 'Elite' }
  ]
  userForm!: FormGroup

  roles: Role[] = []
  rolIDSelected = ''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService

  ) {
    //TODO: Implementar cambio de acciones si la ruta indica modificación de usuario
    //TODO: Implementar role socio default si la ruta indica registro de socio
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: new FormControl("", [Validators.required, Validators.minLength(3)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
      email: new FormControl("", [Validators.required, Validators.email]),
      role: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastName: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      dni: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{7,8}$')]),
      address: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
      dateOfBirth: new FormControl(formatDate(this.dateOfBirthPost, 'yyyy-MM-dd', 'en'), [Validators.required]),
      img: new FormControl(null),
      mounthlyPlan: new FormControl("1"),
    })
    this.route.url.subscribe(
      (data: any) => {
        switch (data[1].path) {
          case 'new':
            this.action = 'Registrar'
            break
          case 'edit': 
            this.action = 'Modificar'
            this.userId = this.route.snapshot.paramMap.get('id')!
            if (this.userId) {
              this.loadUserData(this.userId);
            }
            break
        }
        switch (data[0].path) {
          case 'users':
            this.item = 'Usuario'
            break
          case 'members':
            this.userForm.controls['role'].setValue('2')
            this.item = 'Socio'
            break
        }
      }
    )
  }

  //getters para mejorar redibilidad
  get username() {
    return this.userForm.get('username')
  }

  get password() {
    return this.userForm.get('password')
  }

  get email() {
    return this.userForm.get('email')
  }

  get img() {
    return this.userForm.get('img')
  }

  get role() {
    return this.userForm.get('role')
  }

  get firstName() {
    return this.userForm.get('firstName')
  }

  get lastName() {
    return this.userForm.get('lastName')
  }

  get dni() {
    return this.userForm.get('dni')
  }

  get address() {
    return this.userForm.get('address')
  }

  get phoneNumber() {
    return this.userForm.get('phoneNumber')
  }

  get dateOfBirth() {
    return this.userForm.get('dateOfBirth');
  }

  //TODO: Implementar verificación de username y email únicos

  verificarRuta() {

  }

  validateUsernameRequired(): boolean {
    return this.username?.errors?.['required'] ?? false
  }

  validateUsernameMinLength(): boolean {
    return this.username?.errors?.['minlength'] ?? false
  }

  validatePasswordRequired(): boolean {
    return this.password?.errors?.['required'] ?? false
  }

  validatePasswordMinLength(): boolean {
    return this.password?.errors?.['minlength'] ?? false
  }

  validatePasswordPattern(): boolean {
    return this.password?.errors?.['pattern'] ?? false
  }

  validateEmailRequired(): boolean {
    return this.email?.errors?.['required'] ?? false
  }

  validateEmailFormat(): boolean {
    return this.email?.errors?.['email'] ?? false
  }

  validateRoleRequired(): boolean {
    return this.role?.errors?.['required'] ?? false
  }

  validateFirstNameRequired(): boolean {
    return this.firstName?.errors?.['required'] ?? false
  }

  validateFirstNamePattern(): boolean {
    return this.firstName?.errors?.['pattern'] ?? false
  }

  validateLastNameRequired(): boolean {
    return this.lastName?.errors?.['required'] ?? false
  }

  validateLastNamePattern(): boolean {
    return this.lastName?.errors?.['pattern'] ?? false
  }

  validateDniRequired(): boolean {
    return this.dni?.errors?.['required'] ?? false
  }

  validateDniPattern(): boolean {
    return this.dni?.errors?.['pattern'] ?? false
  }

  validateAddressRequired(): boolean {
    return this.address?.errors?.['required'] ?? false
  }

  validatePhoneNumberRequired(): boolean {
    return this.phoneNumber?.errors?.['required'] ?? false
  }

  validatePhoneNumberPattern(): boolean {
    return this.phoneNumber?.errors?.['pattern'] ?? false
  }

  validateDateOfBirthRequired(): boolean {
    return this.dateOfBirth?.errors?.['required'] ?? false
  }

  validateDateOfBirthInvalid(): boolean {
    return this.dateOfBirth?.errors?.['invalidDate'] ?? false
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64post = reader.result;
        this.userForm.patchValue({
          img: this.imageBase64post
        });
      };
    }
  }

  loadUserData(idUser: string) {
    this.userService.getUserById(idUser).subscribe(
      (dataUser) => {
        this.userForm.patchValue(
          {
            username: dataUser.username,
            password: dataUser.password,
            email: dataUser.email,
            role: dataUser.role,
            firstName: dataUser.personalInformation.firstName,
            lastName: dataUser.personalInformation.lastName,
            dni: dataUser.personalInformation.dni,
            address: dataUser.personalInformation.address,
            phoneNumber: dataUser.personalInformation.phoneNumber,
            dateOfBirth: formatDate(dataUser.personalInformation.dateOfBirth, 'yyyy-MM-dd', 'en'),
            img: dataUser.img,
          }
        )
       // this.imageBase64post = dataUser.img;
      },
      (error: any) => {
        console.log("Error cargando datos de usuario", error)
      }
    )
  }


  //verificar si funciona
  getRoles() {
    this.roleService.getAllRoles().subscribe(
      (data: any) => {
        //prueba
        console.log(data)
        this.roles = data.map((r: any) => {
          return {
            _id: r._id,
            name: r.name
          } as Role
        })
        console.log(this.roles)
      },
      (error: any) => {
        console.error(error)
      }
    )
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if(this.action=='Registrar'){

        const userNew: UserRequest = {
          username: this.username?.value,
          password: this.password?.value,
          email: this.email?.value,
          role: this.role?.value,
          personalInformation: {
            firstName: this.firstName?.value,
            lastName: this.lastName?.value,
            dni: this.dni?.value,
            address: this.address?.value,
            phoneNumber: this.phoneNumber?.value,
            dateOfBirth: this.dateOfBirth?.value,
          },
          img: this.img?.value
        }
        console.log(userNew);

        this.userService.addUser(userNew).subscribe(
          (res: any) => {
            console.log("nuevo usuario registrado", res)
            this.router.navigate(['/users/']);
          },
          (error: any) => {
            console.error("Error al registrar el usuario", error)
          }
        )
      }
      

      
      if(this.action=='Modificar'){
        const userUpdated: UserResponse={
          _id: this.userId,
          username: this.username?.value,
          password: this.password?.value,
          email: this.email?.value,
          role: this.role?.value,
          personalInformation: {
            firstName: this.firstName?.value,
            lastName: this.lastName?.value,
            dni: this.dni?.value,
            address: this.address?.value,
            phoneNumber: this.phoneNumber?.value,
            dateOfBirth: this.dateOfBirth?.value,
          },
          img: this.img?.value
        }
        console.log(userUpdated);

        this.userService.updateUser(userUpdated).subscribe(
          (data:any)=>{
            console.log("usuario modificado", data)
            this.router.navigate(['/users/'])
          },
          (error:any)=>{
            console.error("Error al modificar el usuario", error)
          }
        )
      }
        
    } else {
      console.log('Formulario no válido');
    }

  }

}
