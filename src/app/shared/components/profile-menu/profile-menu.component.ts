import {Component, OnInit, ElementRef, Input} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {Profile} from "../../models";

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  @Input()
  profile!: Profile;
  constructor(private _el: ElementRef, private authService: AuthenticationService) { }
  ngOnInit(): void {
  }

  public logOut() {
    this.authService.logout();
    localStorage.clear();
    window.location.href = '/home';
  }
}
