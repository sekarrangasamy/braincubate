import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
 

  private resourceUrl = environment.resourceUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getAchievement(queryParams): Observable<any> {
    return this.http.get(this.resourceUrl + '/achievements?limit=' + queryParams.limit + '&offset=' + queryParams.offset)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public filterAchievementData(filterValue,queryParams): Observable<any> {
    return this.http.get(this.resourceUrl + '/achievements?name=' + filterValue + '&limit='+queryParams.limit)
  }

  public createAchievement(data,file:any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).map((key) => {
      formData.append(key, data[key]);
    });
    formData.append('icon', file);
    return this.http.post(this.resourceUrl + '/achievements', formData);
  }

  public updateAchievement(id, data,file:any): Observable<any> {
    const formData = new FormData();
    Object.keys(data).map((key) => {
      formData.append(key, data[key]);
    });
    formData.append('icon', file);
    return this.http.put(this.resourceUrl + '/achievements/' + id,formData);
  }

  public deleteAchievement(id): Observable<any> {
    return this.http.delete(this.resourceUrl + '/achievements/' + id)
  }

  searchPagination(textValue: any,queryParams) {
    return this.http.get(this.resourceUrl + '/achievements?name=' + textValue + '&limit='+queryParams.limit+ '&offset=' + queryParams.offset)
  }
}
