import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$')]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
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

  isLogged: boolean = false;

  onLogin(){
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control?.markAsTouched({ onlySelf: true });
        control?.markAsDirty({ onlySelf: true });
      });
  
        if (this.loginForm.valid) {
        this.loginService.login(this.username?.value, this.password?.value).subscribe(
          (res: any) => {
            console.log(res)
            if (res.status == 200){
              this.isLogged = true;
              //cookies
              /* sessionStorage.setItem("userId",res.data.user.id)
              this.router.navigate(['/home']); */
            }
          },
          (error:any)=>{
            //aplicar toast
            this.isLogged=true;
            console.log(error)
          }
        )
      }
  }
}
