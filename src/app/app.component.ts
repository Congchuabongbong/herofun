import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { AlertService } from './shared/services/alert.service';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private lastPoppedUrl!: string | undefined;
  private yScrollStack: any[] = [];

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private location: Location,
    private notifier: NotifierService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    Aos.init({
      once: true,
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart) {
        if (ev.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (ev instanceof NavigationEnd) {
        if (ev.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else window.scrollTo(0, 0);
      }
    });

    this.alert();
  }

  private alert() {
    this.subscription = this.alertService.getAlert().subscribe((message) => {
      switch (message && message.type) {
        case 'success':
          this.notification('success', message.text);
          break;
        case 'error':
          this.notification('error', message.text.error.message);
          break;
      }
    });
  }

  private notification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
