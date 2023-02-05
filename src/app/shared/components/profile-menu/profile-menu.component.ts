import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  constructor(private _el: ElementRef, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {

  }
  public onMenuToggle() {
    const toggleMenu = this._el.nativeElement.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }

}
