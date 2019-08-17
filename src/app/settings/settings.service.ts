import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private resourceUrl = environment.resourceUrl;

  constructor(private http: HttpClient) { }

  createSettings(data,file): Observable<any> {
    const formData=new FormData();
    Object.keys(data).map((key)=>{
      formData.append(key,data[key]);
    })
    formData.append('logo',file)
    return this.http.post(this.resourceUrl + '/settings', formData);
  }

  getAll(): Observable<any> {
    return this.http.get(this.resourceUrl + '/settings');
  }

  updateSettings(id, data,file:any): Observable<any> {
    const formData=new FormData();
    Object.keys(data).map((key)=>{
      formData.append(key,data[key]);
    })
    formData.append('logo',file)
    return this.http.put(this.resourceUrl + '/settings/' + id, formData);
  }
}
