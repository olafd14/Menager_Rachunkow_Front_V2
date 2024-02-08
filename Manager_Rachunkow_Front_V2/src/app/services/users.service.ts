import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUsers } from '../interfaces/iusers';
import { IUser } from '../interfaces/iuser';
import { IResponse } from '../interfaces/iresponse';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  appUrl = 'https://localhost:8080';
  constructor(private http: HttpClient) { }
  getAllUsers() {
    return this.http.get<IUsers>(this.appUrl + '/api/users/getAll', {withCredentials: true}).toPromise();
  }
  editUser(user: IUser) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.put<IResponse>(this.appUrl + '/api/users/edit', user, options).toPromise();
  }
}
