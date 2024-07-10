import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  msjLogin = ''

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  login(username: string, password: string) {
    this.loginService.login(username, password).subscribe(
      (res: any) => {
        console.log(res)
        if (res.status == 200){
          //cookies
          sessionStorage.setItem("userId",res.data.user.id)

          //this.router.

        }else{
          this.msjLogin = 'Credenciales incorrectas.'
        }
      },
      (error:any)=>{
        //aplicar toast
        
        console.log(error)
      }
    )
  }
}
