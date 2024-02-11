import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../interfaces/iresponse';
import { IUser } from '../interfaces/iuser';
import { IUsers } from '../interfaces/iusers';
import { UsersService } from '../services/users.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedComponent = 'Table';
  headElements = ['Nazwa', 'Mail', 'Num. Telefonu', 'Blokada', ''];
  response: IResponse | undefined = { code: 0, message: '', status: '' };
  user: IUser = { mail: '', name: '', password: '', telNumber: '', isPaid: false};
  elements: IUsers | undefined = { usersList: Array<IUser>() };
  userEdit: IUser = { mail: '', name: '', password: '', telNumber: '', isPaid: false};
  paidCollection = ["Tak", "Nie"];
  selectedOptionPaid = "";
  isAdminAccount: boolean = false;

  constructor(private userService: UsersService, private toastr: ToastrService) { }
  ngOnInit() {
    this.getData();
  }
  async getData() {
    this.elements = await this.userService.getAllUsers();
    console.log(this.elements);
  }
  editUser(userToEdit: IUser, i: number) {
    this.userEdit = userToEdit;
    this.isAdminAccount = i === 0;
    this.selectedComponent = 'Edit';

    if(userToEdit.isPaid){
      this.selectedOptionPaid = "Tak";
    }
    else{
      this.selectedOptionPaid = "Nie";
    }
  }
  async editUserInDB(arg: boolean) {
    if (arg == true) {

      if(this.selectedOptionPaid == "Tak"){
        this.userEdit.isPaid = true;
      }
      else{
        this.userEdit.isPaid = false;
      }

      this.response = await this.userService.editUser(this.userEdit);
      if (this.response) {
        this.toastr.success('Edytowano użytkownika');
        this.selectedComponent = 'Table';
        this.elements = await this.userService.getAllUsers();

      }
    } else {
      this.selectedComponent = 'Table';
    }
  }
}