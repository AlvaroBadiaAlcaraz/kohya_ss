import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  processData(params: any): Observable<any> {
    return this.http.post('/api/process', params);
  }

  uploadFiles(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name);
    });
    return this.http.post('/api/upload', formData);
  }

  createEnv(params: any): Observable<any> {
    return this.http.post('/api/env', params);
  }

  getImages(): Observable<any> {
    return this.http.get('/api/images');
  }

  updateDescription(image: string, description: string): Observable<any> {
    return this.http.post('/api/update_description', { image, description });
  }

}

