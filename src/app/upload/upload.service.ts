import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  getDocs() {
    console.log(environment.apiUrl);
    return this.http.get(environment.apiUrl + 'api/docs');
  }

  saveDoc(doc) {
    console.log(environment.apiUrl);
    return this.http.put(environment.apiUrl + 'api/docs', doc);
  }
}
