import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { IInformations } from '../interfaces/iinformations';
import { IInformation } from '../interfaces/iinformation';
import { IResponse } from '../interfaces/iresponse';
import { InformationsService } from '../services/informations.service';

@Component({
  selector: 'app-info',
  templateUrl: './informations.component.html',
  styleUrl: './informations.component.css'
})
export class InformationsComponent implements OnInit {
  selectedComponent = 'Table';
  elements: IInformations | undefined = { informationList: Array<IInformation>() };
  response: IResponse | undefined = { code: 0, message: '', status: '' };
  information: IInformation = { name: '', content: '', UserId: this.cookieService.get('userId'), Id: 0 };
  informationEdit: IInformation = { name: '', content: '', UserId: this.cookieService.get('userId'), Id: 0 };
  constructor(private informationService: InformationsService, private toastr: ToastrService, private cookieService: CookieService) { }
  ngOnInit() {
    this.getData();
  }
  async getData() {
    this.elements = await this.informationService.getInformationsForUser(this.cookieService.get('userMail'));
    console.log(this.elements);
  }
  addNew() {
    this.selectedComponent = 'AddNewInfo';
  }
  editInfo(infoToEdit: IInformation) {
    this.selectedComponent = 'Edit';
    this.informationEdit = infoToEdit;
  }
  async addNewInfo() {
    this.response = await this.informationService.addInformation(this.information);
    if (this.response && this.response.status === 'Success') {
      this.toastr.success('Dodano informacje');
      this.selectedComponent = 'Table';
      this.elements = await this.informationService.getInformationsForUser(this.cookieService.get('userMail'));
    }
  }
  async editInfoInDB() {
    this.response = await this.informationService.editInformation(this.informationEdit);
    if (this.response && this.response.status === 'Success') {
      this.toastr.success('Edytowano informacje');
      this.selectedComponent = 'Table';
      this.elements = await this.informationService.getInformationsForUser(this.cookieService.get('userMail'));
    }
  }
}
