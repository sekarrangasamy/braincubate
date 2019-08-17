import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  private resourceUrl = environment.resourceUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getLevels(queryParams: any): Observable<any> {
    return this.http.get(this.resourceUrl + '/levels?limit=' + queryParams.limit + '&offset=' + queryParams.offset)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public nameFilter(value): Observable<any> {
    return this.http.get(this.resourceUrl + '/levels?name=' + value)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public filterLevelData(queryParams: any): Observable<any> {
    return this.http.get(`${this.resourceUrl}/levels`, { params: queryParams })
      .map((response: Response) => {
        return <any>response;
      })
  }

  public getSingleLevel(id): Observable<any> {
    return this.http.get(this.resourceUrl + '/levels/' + id)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public createLevel(obj, img_upload: any, bg_upload: any): Observable<any> {
    var formData = new FormData();

    Object.keys(obj).map((key) => {
      formData.append(key, obj[key]);
    });

    formData.append('icon', img_upload);
    formData.append('bg_img', bg_upload);

    return this.http.post(this.resourceUrl + '/levels', formData)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public getLevelsAll(): Observable<any> {
    return this.http.get(this.resourceUrl + '/levels/all')
      .map((response: Response) => {
        return <any>response;
      })
  }

  public getParticularLevel(levelId): Observable<any> {
    return this.http.get(this.resourceUrl + '/levels/' + levelId)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public updateLevel(id, obj, icon, bg_img): Observable<any> {
    var formData = new FormData();

    Object.keys(obj).map((key) => {
      formData.append(key, obj[key]);
    });

    formData.append('icon', icon);
    formData.append('bg_img', bg_img);
    return this.http.put(this.resourceUrl + '/levels/' + id, formData)
  }
}
