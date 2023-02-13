import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../shared/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],


})
export class HeaderComponent implements OnInit {

  jwt!: string;
  profile!: any;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.jwt = JSON.parse(localStorage.getItem("jwt")!);
    this.profile = JSON.parse(localStorage.getItem("profile")!);
  }

}
