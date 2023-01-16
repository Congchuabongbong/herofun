import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Profile} from "../../shared/models";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],

})
export class ProfileComponent implements OnInit {

  profile!: Profile;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getProfile();
    console.log(this.profile)
  }

  getProfile(){
    this.authService.getProfile().subscribe(res => this.profile = res.data)
  }

}
