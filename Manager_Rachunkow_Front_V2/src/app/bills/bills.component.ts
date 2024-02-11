import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  headElements = ['Data', 'Tytuł', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj',
    'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień', '',''];
  response: IResponse | undefined = { code: 0, message: '', status: '' };
  bill: IBill = {
    name: '', year: '', april: '', august: '', december: '', february: '', id: 0, january: '', july: '',
    june: '', march: '', may: '', november: '', october: '', september: '', userId: this.cookieService.get('userId')
  };
  elements: IBills | undefined = { billList: Array<IBill>() };
  billEdit: IBill = {
    name: '', year: '', april: '', august: '', december: '', february: '', id: 0, january: '', july: '',
    june: '', march: '', may: '', november: '', october: '', september: '', userId: ''
  };
  billId: number = 0; 
  constructor(private billsService: BillsService, private toastr: ToastrService, private cookieService: CookieService, private cdRef: ChangeDetectorRef) { }
  ngOnInit() {
    this.getData();
    this.lastYear = '';
  }
  async getData() {
    this.elements = await this.billsService.getBillsForUser(this.cookieService.get('userMail'));
    
    this.cdRef.detectChanges();
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
  async delBill(bId: number) {
    this.selectedComponent = 'Del';
    this.billId = bId;
  }
  async addNewBill(arg: boolean) {
    if (arg == true) {
      this.response = await this.billsService.addBill(this.bill);
      if (this.response && this.response.status === 'Success') {
        this.toastr.success('Dodano rachunek');
        this.selectedComponent = 'Table';
        this.elements = await this.billsService.getBillsForUser(this.cookieService.get('userMail'));
        
        this.cdRef.detectChanges();
      }
    } else {
      this.selectedComponent = 'Table';
    }
  }
  async editBillInDB(arg: boolean) {
    if (arg == true) {
      if (this.billEdit) {
        this.response = await this.billsService.editBill(this.billEdit);
        if (this.response && this.response.status === 'Success') {
          this.toastr.success('Edytowano rachunek');
          this.lastYear = '';
          this.selectedComponent = 'Table';
          this.elements = await this.billsService.getBillsForUser(this.cookieService.get('userMail'));
          
          this.cdRef.detectChanges();
        }
      }
    } else {
      this.selectedComponent = 'Table';
    }
  }

  async delBillInDB(arg: boolean) {
    if (arg == true) {
      this.response = await this.billsService.deleteBill(this.billId);
      if (this.response && this.response.status === 'Success') {
        this.toastr.success('Usunięto notatkę');
        this.selectedComponent = 'Table';
        this.elements = await this.billsService.getBillsForUser(this.cookieService.get('userMail'));
        
        this.cdRef.detectChanges();
      }
    } else {
      this.selectedComponent = 'Table';
    }
  }
  newLastYear(newYear: string) {
    this.lastYear = newYear;
  }
}