import { Component } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entorno',
  templateUrl: './entorno.component.html',
  styleUrl: './entorno.component.css'
})
export class EntornoComponent {
  selectedFiles: File[] = [];
  message: string = ""
  input:boolean = false
  env: boolean = false

  constructor(private dataService: DataService) {}

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit() {
    this.dataService.uploadFiles(this.selectedFiles)
      .subscribe(responseFiles => {
        console.log('Response: ', responseFiles);
        this.input = true
      }, error => {
        console.error('Error: ', error);
      });
  }

  opciones = [
    {opcion: 'Hombre'},{opcion: 'Mujer'}
  ]

  myForm = new FormGroup({
    sujeto: new FormControl('', Validators.required),
    clase: new FormControl('', Validators.required)
  });

  onSubmitForm() {
    const params = {
      sujeto: this.myForm.value.sujeto,
      clase: this.myForm.value.clase
    };
    this.dataService.createEnv(params)
      .subscribe(response => {
        console.log('Response: ', response);
        this.env = true
      }, error => {
        console.error('Error: ', error);
      });
  }

}
