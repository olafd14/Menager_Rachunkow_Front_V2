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
  information: IInformation = { name: '', content: '', userId: this.cookieService.get('userId'), id: 0 };
  informationEdit: IInformation = { name: '', content: '', userId: this.cookieService.get('userId'), id: 0 };
  headElements = ['Nazwa', "Treść"];
  informationId: number = 0; 
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
  async delInfo(infoId: number) {
    this.selectedComponent = 'Del';
    this.informationId = infoId;
  }
  async delInfoInDB(arg: boolean) {
    if (arg == true) {
      this.response = await this.informationService.deleteInformation(this.informationId);
      if (this.response && this.response.status === 'Success') {
        this.toastr.success('Usunięto notatkę');
        this.selectedComponent = 'Table';
        this.elements = await this.informationService.getInformationsForUser(this.cookieService.get('userMail'));
      }
    } else {
      this.selectedComponent = 'Table';
    }
  }
  async addNewInfo(arg: boolean) {
    if (arg == true) {
      this.response = await this.informationService.addInformation(this.information);
      if (this.response && this.response.status === 'Success') {
        this.toastr.success('Dodano notatkę');
        this.selectedComponent = 'Table';
        this.elements = await this.informationService.getInformationsForUser(this.cookieService.get('userMail'));
      }
    } else {
      this.selectedComponent = 'Table';
    }
  }
  async editInfoInDB(arg: boolean) {
    if (arg == true) {
      this.response = await this.informationService.editInformation(this.informationEdit);
      if (this.response && this.response.status === 'Success') {
        this.toastr.success('Edytowano notatkę');
        this.selectedComponent = 'Table';
        this.elements = await this.informationService.getInformationsForUser(this.cookieService.get('userMail'));
      }
    } else {
      this.selectedComponent = 'Table';
    }
  }
}
