import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../interfaces/iresponse';
import { IUser } from '../interfaces/iuser';
import { IUsers } from '../interfaces/iusers';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedComponent = 'Table';
  headElements = ['Nazwa', 'Mail', 'Num. Telefonu', 'Zaplacil', 'Edytuj'];
  response: IResponse | undefined = { code: 0, message: '', status: '' };
  user: IUser = { mail: '', name: '', password: '', telNumber: '', isPaid: false };
  elements: IUsers | undefined = { usersList: Array<IUser>() };
  userEdit: IUser = { mail: '', name: '', password: '', telNumber: '', isPaid: false };
  constructor(private userService: UsersService, private toastr: ToastrService) { }
  ngOnInit() {
    this.getData();
  }
  async getData() {
    this.elements = await this.userService.getAllUsers();
    console.log(this.elements);
  }
  editUser(userToEdit: IUser) {
    this.selectedComponent = 'Edit';
    this.userEdit = userToEdit;
  }
  async editUserInDB(arg: boolean) {
    if (arg == true) {
      this.response = await this.userService.editUser(this.userEdit);
      if (this.response && this.response.status === 'Success') {
        this.toastr.success('Edytowano uzytkownika');
        this.selectedComponent = 'Table';
        this.elements = await this.userService.getAllUsers();
      }
    } else {
      this.selectedComponent = 'Table';
    }
  }
}