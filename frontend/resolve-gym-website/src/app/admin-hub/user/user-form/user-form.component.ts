import { formatDate, JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,NgIf],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  dateOfBirthPost = new Date()
  rolesPost = [
    {id:1, title:'Empleado'},
    {id:2, title:'Socio'}
  ]
  monthlyPlans = [
    {id:1, title: 'Premium'},
    {id:2, title: 'Platinum'},
    {id:3, title: 'Elite'}
  ]
  registerForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) { 
    //TODO: Implementar cambio de acciones si la ruta indica modificación de usuario
    //TODO: Implementar role socio default si la ruta indica registro de socio
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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
      // implementar imagenes
      mounthlyPlan: "1"
    });
  }

  //getters para mejorar redibilidad
  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get role() {
    return this.registerForm.get('role');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get dni() {
    return this.registerForm.get('dni');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }

  //TODO: Implementar verificación de username y email únicos

  verificarRuta(){
    
  }

  validateUsernameRequired(): boolean {
    return this.username?.errors?.['required'] ?? false;
  }

  validateUsernameMinLength(): boolean {
    return this.username?.errors?.['minlength'] ?? false;
  }

  validatePasswordRequired(): boolean {
    return this.password?.errors?.['required'] ?? false;
  }

  validatePasswordMinLength(): boolean {
    return this.password?.errors?.['minlength'] ?? false;
  }

  validatePasswordPattern(): boolean {
    return this.password?.errors?.['pattern'] ?? false;
  }

  validateEmailRequired(): boolean {
    return this.email?.errors?.['required'] ?? false;
  }

  validateEmailFormat(): boolean {
    return this.email?.errors?.['email'] ?? false;
  }

  validateRoleRequired(): boolean {
    return this.role?.errors?.['required'] ?? false;
  }

  validateFirstNameRequired(): boolean {
    return this.firstName?.errors?.['required'] ?? false;
  }

  validateFirstNamePattern(): boolean {
    return this.firstName?.errors?.['pattern'] ?? false;
  }

  validateLastNameRequired(): boolean {
    return this.lastName?.errors?.['required'] ?? false;
  }

  validateLastNamePattern(): boolean {
    return this.lastName?.errors?.['pattern'] ?? false;
  }

  validateDniRequired(): boolean {
    return this.dni?.errors?.['required'] ?? false;
  }

  validateDniPattern(): boolean {
    return this.dni?.errors?.['pattern'] ?? false;
  }

  validateAddressRequired(): boolean {
    return this.address?.errors?.['required'] ?? false;
  }

  validatePhoneNumberRequired(): boolean {
    return this.phoneNumber?.errors?.['required'] ?? false;
  }

  validatePhoneNumberPattern(): boolean {
    return this.phoneNumber?.errors?.['pattern'] ?? false;
  }

  validateDateOfBirthRequired(): boolean {
    return this.dateOfBirth?.errors?.['required'] ?? false;
  }

  validateDateOfBirthInvalid(): boolean {
    return this.dateOfBirth?.errors?.['invalidDate'] ?? false;
  }

  onSubmit(): void {
    console.log(this.registerForm.value)
  }

}
