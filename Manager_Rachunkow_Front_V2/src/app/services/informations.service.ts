import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IInformations } from '../interfaces/iinformations';
import { IResponse } from '../interfaces/iresponse';
import { IInformation } from '../interfaces/iinformation';
@Injectable({
  providedIn: 'root'
})
export class InformationsService {
  appUrl = 'https://localhost:8080';
  constructor(private http: HttpClient) { }
  getInformationsForUser(mail: string) {
    return this.http.get<IInformations>(this.appUrl + '/api/information/getAll/' + mail).toPromise();
  }
  addInformation(information: IInformation) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.post<IResponse>(this.appUrl + '/api/information/add', information, options).toPromise();
  }
  editInformation(information: IInformation) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.put<IResponse>(this.appUrl + '/api/information/edit', information, options).toPromise();
  }
  deleteInformation(mail: string) {
    return this.http.delete<IResponse>(this.appUrl + '/api/information/delete/' + mail).toPromise();
  }
}