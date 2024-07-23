import { Component } from '@angular/core';
import { DataService } from '../../servicios/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrl: './caption.component.css'
})
export class CaptionComponent {
  images: any[] = [];

  constructor(private dataService: DataService, private router: Router ) { }

  ngOnInit() {
    this.dataService.getImages().subscribe(data => {
      this.images = data;
    });
  }

  saveDescription(item: any) {
    this.dataService.updateDescription(item.image, item.description).subscribe(response => {
      console.log('Description saved:', response);
    });
  }

  siguiente_paso() {
    this.router.navigate(['/train']);
  }
}
