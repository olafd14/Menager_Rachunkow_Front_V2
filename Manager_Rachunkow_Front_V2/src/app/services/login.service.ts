import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResponseAfterLogin } from '../interfaces/iresponse-after-login';
import { IUser } from '../interfaces/iuser';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  appUrl = 'https://localhost:8080';
  constructor(private http: HttpClient) { }
  async checkIsUser(user: IUser): Promise<IResponseAfterLogin> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    try {
      const response = await this.http.post<IResponseAfterLogin>(this.appUrl + '/Register/Login', user, options).toPromise();

      // Ensure response is valid, otherwise throw an error
      if (!response || response.isAdmin === undefined || response.status === undefined) {
        throw new Error('Invalid response from server');
      }

      return response;
    } catch (error) {
      // Handle other potential errors here
      console.error('Error during login:', error);
      throw error;
    }
  }
  async register(user: IUser): Promise<IResponseAfterLogin> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    try {
      const response = await this.http.post<IResponseAfterLogin>(this.appUrl + '/Register/Register', user, options).toPromise();

      // Ensure response is valid, otherwise throw an error
      if (!response || response.isAdmin === undefined || response.status === undefined) {
        throw new Error('Invalid response from server');
      }

      return response;
    } catch (error) {
      // Handle other potential errors here
      console.error('Error during registration:', error);
      throw error;
    }
  }
}
