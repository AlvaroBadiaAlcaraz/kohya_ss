import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  enlace: string = 'https://github.com/AUTOMATIC1111/stable-diffusion-webui';

  Ir_a_Lora() {
    this.router.navigate(['/req']);
  }
}
