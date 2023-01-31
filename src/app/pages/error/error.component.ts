import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  message = 'The page you’re looking for doesn’t exist.';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let message = this.route.snapshot.paramMap.get('message')
    if (message){
      this.message = message;
    }
  }

}
