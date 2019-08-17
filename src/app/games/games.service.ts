import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private resourceUrl = environment.resourceUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getGames(queryParams: any): Observable<any> {
    return this.http.get(this.resourceUrl + '/games?limit=' + queryParams.limit + '&offset=' + queryParams.offset)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public getGames1(): Observable<any> {
    return this.http.get(this.resourceUrl + '/games?limit=' + 10 + '&offset=' + 0)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public nameFilter(value): Observable<any> {
    return this.http.get(this.resourceUrl + '/games?name=' + value)
      .map((response: Response) => {
        return <any>response;
      })
  }


  public filterGameData(queryParams: any): Observable<any> {
    return this.http.get(`${this.resourceUrl}/games`, { params: queryParams })
      .map((response: Response) => {
        return <any>response;
      })
  }

  public getSingleGame(id): Observable<any> {
    return this.http.get(this.resourceUrl + '/games/' + id)
      .map((response: Response) => {
        return <any>response;
      })
  }

  public createGames(obj, icon: any, bg_img: any, addArr): Observable<any> {
    var formData = new FormData();
    console.log("service", addArr);
    Object.keys(obj).map((key) => {
      formData.append(key, obj[key]);
    });

    formData.append('icon', icon);
    formData.append('bg_img', bg_img);
    for (let i = 0; i < addArr.length; i++) {
      formData.append('instruction_' + (i + 1), addArr[i].imgName)
    }

    for (let i = 0; i < addArr.length; i++) {
      formData.append('inst_desc' + '[' + i + ']', addArr[i].imgDesc)
    }
    return this.http.post(this.resourceUrl + '/games', formData)
      .map((response: Response) => {
        return <any>response;
      })

  }

  public updateGame(id, obj, icon: any, bg_img: any): Observable<any> {
    var formData = new FormData();
    // console.log("upservice",addArr);
    Object.keys(obj).map((key) => {
      formData.append(key, obj[key]);
    });

    formData.append('icon', icon);
    formData.append('bg_img', bg_img);

    // for (let i = 0; i < addArr.length; i++) {
    //   formData.append('instruction_' + (i + 1), addArr[i].imgName)
    // }

    // for (let i = 0; i < addArr.length; i++) {
    //   formData.append('inst_desc' + '[' + i + ']', addArr[i].imgDesc)
    // }
    return this.http.put(this.resourceUrl + '/games/' + id, formData)
  }

  public updateGameView(id, obj, icon: any, bg_img: any): Observable<any> {
    var formData = new FormData();
    // console.log("upservice",addArr);
    Object.keys(obj).map((key) => {
      formData.append(key, obj[key]);
    });

    formData.append('icon', icon);
    formData.append('bg_img', bg_img);

    return this.http.put(this.resourceUrl + '/games/' + id, formData);
  }

  public deleteByGameId(gameId, insId): Observable<any> {
    return this.http.delete(this.resourceUrl + '/games/' + gameId + '/instruction/' + insId)
  }

  public updateInstruction(id, addArr: any): Observable<any> {
    console.log("Instructionservice", addArr);
    var formData = new FormData();

    formData.append('inst_icon', addArr.imgName)
    formData.append('inst_desc', addArr.imgDesc)
    return this.http.put(this.resourceUrl + '/games/' + id + '/instruction', formData);
  }




}

