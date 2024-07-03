import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHubLayoutComponent } from './admin-hub/admin-hub-layout/admin-hub-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminHubLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'resolve-gym-website';
}
