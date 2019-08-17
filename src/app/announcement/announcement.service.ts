import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  

  private resourceUrl = environment.resourceUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getAnnouncement(queryParams: any): Observable<any> {
    return this.http.get(this.resourceUrl + '/announcements?limit=' + queryParams.limit + '&offset=' + queryParams.offset)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public filterAnnouncementData(filterValue): Observable<any> {
    return this.http.get(this.resourceUrl + '/announcements?title=' + filterValue)
  }

  public createAnnouncement(obj, icon: any): Observable<any> {
    var formData = new FormData();

    Object.keys(obj).map((key) => {
      formData.append(key, obj[key]);
    });

    formData.append('icon', icon);
    return this.http.post(this.resourceUrl + '/announcements', formData)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public getParticularAnnouncement(id): Observable<any> {
    return this.http.get(this.resourceUrl + '/announcements/' + id)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public updateAnnouncement(id, obj, icon: any): Observable<any> {
    var formData = new FormData();

    Object.keys(obj).map((key) => {
      formData.append(key, obj[key]);
    });

    formData.append('icon', icon);
    return this.http.put(this.resourceUrl + '/announcements/' + id, formData);
  }

  public putAnnouncement(id) : Observable<any> {
    return this.http.put(this.resourceUrl + '/announcements/' + id + '/send',"");
  }


  public getNotifications(query) : Observable<any> {
    return this.http.get(this.resourceUrl+'/notifications',{params : query});
  }

  public filterData(searchQueryParams): Observable<any> {
    return this.http.get(this.resourceUrl + '/announcements',{params : searchQueryParams})
    .map((response: Response) => {
      return <any>response;
    })
  }
}
