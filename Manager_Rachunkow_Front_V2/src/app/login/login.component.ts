import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { IResponseAfterLogin } from '../interfaces/iresponse-after-login';
import { IUser } from '../interfaces/iuser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService) { }
  loged = true;
  logedInDb!: IResponseAfterLogin;
  registerInDb!: IResponseAfterLogin;
  infoInvalidData = '';
  user: IUser = { name: '', password: '', mail: '', telNumber: 0, isPaid: false };
  ngOnInit() {
    this.loged = true;
  }
  async logIn() {
    if (this.loged === false) {
      this.infoInvalidData = '';
      this.loged = true;
      return;
    }
    this.logedInDb = await this.loginService.checkIsUser(this.user);
    let isAdminLocal = 'false';
    if (this.logedInDb.isAdmin === true) {
      isAdminLocal = 'true';
    } else {
      isAdminLocal = 'false';
    }
    if (this.logedInDb.status === 'Success') {
      this.cookieService.set('userMail', this.logedInDb.mail);
      this.cookieService.set('userId', this.logedInDb.idUser);
      this.cookieService.set('isAdmin', isAdminLocal);
      this.toastr.success('Success!', 'You\'re logged!');
      console.log(this.logedInDb);
      console.log(this.logedInDb.idUser);
      this.router.navigate(['home']);
    } else {
      this.toastr.error('Invalid email or password');
      this.infoInvalidData = 'Invalid email or password';
    }
  }
  async register() {
    if (this.loged === true) {
      this.infoInvalidData = '';
      this.loged = false;
      return;
    }
    this.registerInDb = await this.loginService.register(this.user);
    let isAdminLocal = 'false';
    if (this.registerInDb.isAdmin === true) {
      isAdminLocal = 'true';
    } else {
      isAdminLocal = 'false';
    }
    if (this.registerInDb.status === 'Success') {
      this.cookieService.set('userMail', this.registerInDb.mail);
      this.cookieService.set('userId', this.registerInDb.idUser);
      this.cookieService.set('isAdmin', isAdminLocal);
      this.toastr.success('Success!', 'Register finished success. You\'re logged!');
      this.router.navigate(['home']);
    } else {
      this.toastr.error('Register failed');
      this.infoInvalidData = 'Register failed';
    }
  }
}