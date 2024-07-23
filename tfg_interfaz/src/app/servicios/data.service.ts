import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  addKey(params: any): Observable<any> {
    return this.http.post('/api/addKey', params);
  }

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

  crearConfig(filename: string, content: any): Observable<any> {
    return this.http.post('/api/crear_config', { filename, content });
  }

  cargar_config(filename: string): Observable<any> {
    return this.http.get('/api/cargar_config', { params: { filename } });
  }

  update_config(filename: string, content: any): Observable<any> {
    return this.http.post('/api/update_config', { filename, content });
  }

  start_train(): Observable<any> {
    return this.http.get<any>('/api/start_train'); 
  }

  listFiles(): Observable<any> {
    return this.http.get('/api/list_files');
  }

  downloadFile(filename: string): Observable<Blob> {
    return this.http.get(`/api/download/${filename}`, { responseType: 'blob' });
  }

}

