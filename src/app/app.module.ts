import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CountUpModule } from 'ngx-countup';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CouterUpComponent } from './shared/components/couter-up/couter-up.component';
import { PageTitleAreaComponent } from './shared/components/page-title-area/page-title-area.component';
import { SlideTestimonialComponent } from './shared/components/slide-testimonial/slide-testimonial.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { VolunteerComponent } from './pages/volunteer/volunteer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './layout/auth/login/login.component';
import { RegisterComponent } from './layout/auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    CountUpModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
