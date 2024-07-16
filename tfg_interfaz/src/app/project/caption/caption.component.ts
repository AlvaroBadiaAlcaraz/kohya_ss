import { Component } from '@angular/core';
import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrl: './caption.component.css'
})
export class CaptionComponent {
  images: any[] = [];

  constructor(private dataService: DataService ) { }

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
}
