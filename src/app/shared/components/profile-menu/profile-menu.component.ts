import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {Profile} from "../../models";

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {
  profile!: any;
  constructor(private _el: ElementRef, private authService: AuthenticationService) { }
  ngOnInit(): void {
    let profile = localStorage.getItem('profile')
    if (profile){
      this.profile = JSON.parse(profile);
    }
  }

  public logOut() {
    this.authService.logout();
    window.location.href = '/home';
  }
}
