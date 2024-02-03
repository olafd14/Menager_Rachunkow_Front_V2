import { Component, OnInit } from '@angular/core';
import { BillsService } from '../services/bills.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { IResponse } from '../interfaces/iresponse';
import { IBill } from '../interfaces/ibill';
import { IBills } from '../interfaces/ibills';
@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  selectedComponent = 'Table';
  lastYear = '';
  headElements = ['Rok', 'Nazwa', 'Styczen', 'Luty', 'Marzec', 'Kwiecien', 'Maj',
    'Czerwiec', 'Lipiec', 'Sierpien', 'Wrzesien', 'Pazdziernik', 'Listopad', 'Grudzien', 'Edytuj'];
  response: IResponse | undefined = { code: 0, message: '', status: '' };
  bill: IBill = {
    Name: '', Year: '', April: '', August: '', December: '', February: '', Id: 0, January: '', July: '',
    June: '', March: '', May: '', November: '', October: '', September: '', UserId: this.cookieService.get('userId')
  };
  elements: IBills | undefined = { billList: Array<IBill>() };
  billEdit: IBill = {
    Name: '', Year: '', April: '', August: '', December: '', February: '', Id: 0, January: '', July: '',
    June: '', March: '', May: '', November: '', October: '', September: '', UserId: ''
  };
  constructor(private billsService: BillsService, private toastr: ToastrService, private cookieService: CookieService) { }
  ngOnInit() {
    this.getData();
    this.lastYear = '';
  }
  async getData() {
    this.elements = await this.billsService.getBillsForUser(this.cookieService.get('userMail'));
  }
  addNew() {
    this.selectedComponent = 'AddNewBill';
  }
  editBill(billToEdit: IBill | undefined) {
    this.selectedComponent = 'Edit';
    if (billToEdit) {
      console.log(billToEdit);
      this.billEdit = billToEdit;
    }
  }
  async addNewBill() {
    this.response = await this.billsService.addBill(this.bill);
    if (this.response && this.response.status === 'Success') {
      this.toastr.success('Dodano rachunek');
      this.selectedComponent = 'Table';
      this.elements = await this.billsService.getBillsForUser(this.cookieService.get('userMail'));
    }
  }
  async editBillInDB() {
    if (this.billEdit) {
      this.response = await this.billsService.editBill(this.billEdit);
      if (this.response && this.response.status === 'Success') {
        this.toastr.success('Edytowano rachunek');
        this.lastYear = '';
        this.selectedComponent = 'Table';
        this.elements = await this.billsService.getBillsForUser(this.cookieService.get('userMail'));
      }
    }
  }
  newLastYear(newYear: string) {
    this.lastYear = newYear;
  }
}