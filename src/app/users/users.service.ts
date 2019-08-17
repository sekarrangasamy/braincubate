import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private resourceUrl = environment.resourceUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(queryParams: any): Observable<any> {
    return this.http.get(this.resourceUrl + '/users?limit=' + queryParams.limit + '&offset=' + queryParams.offset)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public countryDetails(): Observable<any> {
    return this.http.get(this.resourceUrl + '/country')
      .map((response: Response) => {
        return <any>response;
      })
  }

  public countryNameFilter(name): Observable<any> {
    return this.http.get(this.resourceUrl + '/country?name=' + name)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public getParticularUser(id): Observable<any> {
    return this.http.put(this.resourceUrl + '/users/update-status', id)
  }

  public nameFilter(value): Observable<any> {
    return this.http.get(this.resourceUrl + '/users?name=' + value)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public filterUserData(queryParams: any): Observable<any> {
    return this.http.get(`${this.resourceUrl}/users`, { params: queryParams })
  }

  public getSingleUser(id): Observable<any> {
    return this.http.get(this.resourceUrl + '/users/' + id)
      .map((response: Response) => {
        return <any>response;
      })
  }
}
