import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { AuthenticationService } from "../../shared/services/authentication.service";
import { Router } from "@angular/router";
import {Profile, ProfileDto, User} from "../../shared/models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],


})
export class HeaderComponent implements OnInit {

  jwt!: User;
  profile!: ProfileDto;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.jwt = JSON.parse(localStorage.getItem("jwt")!);
    this.jwt && (this.profile = this.jwt.profile)
  }

}
