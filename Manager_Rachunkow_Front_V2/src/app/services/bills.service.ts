import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IBills } from '../interfaces/ibills';
import { IBill } from '../interfaces/ibill';
import { IResponse } from '../interfaces/iresponse';
@Injectable({
    providedIn: 'root'
})
export class BillsService {
    appUrl = 'https://localhost:8080';
    constructor(private http: HttpClient) { }
    getBillsForUser(mail: string) {
        return this.http.get<IBills>(this.appUrl + '/api/bill/getAll/' + mail).toPromise();
    }
    addBill(bill: IBill) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const options = { headers: headers };
        return this.http.post<IResponse>(this.appUrl + '/api/bill/add/', bill, options).toPromise();
    }
    editBill(bill: IBill) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const options = { headers: headers };
        return this.http.put<IResponse>(this.appUrl + '/api/bill/edit', bill, options).toPromise();
    }
    deleteBill(mail: string) {
        return this.http.delete<IResponse>(this.appUrl + '/api/bill/delete/' + mail).toPromise();
    }
}