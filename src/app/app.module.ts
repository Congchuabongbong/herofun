import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NotifierModule } from 'angular-notifier';
import { CKEditorModule } from "ckeditor4-angular";
import { CountUpModule } from 'ngx-countup';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/auth/login/login.component';
import { RegisterComponent } from './layout/auth/register/register.component';
import { BodyComponent } from './layout/body/body.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainContentComponent } from './layout/main-content/main-content.component';
import { PreloaderContentComponent } from './layout/preloader-content/preloader-content.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { AboutComponent } from './pages/about/about.component';
import { CauseDetailComponent } from './pages/cause-detail/cause-detail.component';
import { CausesComponent } from './pages/causes/causes.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ErrorComponent } from './pages/error/error.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { VolunteerComponent } from './pages/volunteer/volunteer.component';
import { CouterUpComponent } from './shared/components/couter-up/couter-up.component';
import { PageTitleAreaComponent } from './shared/components/page-title-area/page-title-area.component';
import { SlideTestimonialComponent } from './shared/components/slide-testimonial/slide-testimonial.component';
import { TabComponent } from './shared/components/tabs/tab/tab.component';
import { TabsComponent } from './shared/components/tabs/tabs/tabs.component';
import {SponsorComponent} from "./pages/sponsor/sponsor.component";
import {SponsorDetailComponent} from "./pages/sponsor-detail/sponsor-detail.component";


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
    SideMenuComponent,
    PreloaderContentComponent,
    AboutComponent,
    HomeComponent,
    SponsorComponent,
    SponsorDetailComponent,
    ProfileComponent,
    MainComponent,
    CausesComponent,
    CauseDetailComponent,
    CouterUpComponent,
    PageTitleAreaComponent,
    SlideTestimonialComponent,
    ContactUsComponent,
    EventDetailComponent,
    VolunteerComponent,
    LoginComponent,
    RegisterComponent,
    PaymentSuccessComponent,
    TabComponent,
    TabsComponent,
    ErrorComponent,
    PaymentFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    CountUpModule,
    HttpClientModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    NotifierModule,
    FormsModule,
    CKEditorModule,

  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule { }
