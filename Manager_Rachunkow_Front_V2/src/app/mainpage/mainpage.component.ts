import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-main-page',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainPageComponent implements OnInit {
  selectedComponent = 'Home';
  isAdmin = '';
  constructor(private loginService: LoginService,
    public router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService) { }
  ngOnInit() {
    this.isAdmin = this.cookieService.get('isAdmin');
  }
  componentSelect(choosedComponent: string) {
    if (choosedComponent === "Logout") {
      this.cookieService.set('userMail', '');
      this.toastr.success('Wylogowales sie');
      this.router.navigate(['login']);
    }
    this.selectedComponent = choosedComponent;
  }
}
