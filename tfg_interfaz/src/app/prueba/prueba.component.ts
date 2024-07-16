import { Component } from '@angular/core';
import { DataService } from '../servicios/data.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
    param1: string = ""
    param2: string = ""
    result: string = ""

    constructor(private dataService: DataService) {}

    onSubmit() {
      const params = {
        param1: this.param1,
        param2: this.param2
      };
      this.dataService.processData(params).subscribe(response => {
        this.result = response.result;
      });
    }
}
