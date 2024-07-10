import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    public loginService:LoginService,
    private router: Router
  ){}
  logout(){
    this.loginService.logout();
    this.router.navigate(['/home']);
  }
}
