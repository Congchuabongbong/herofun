import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CausesComponent } from './pages/causes/causes.component';
import { CauseDetailComponent } from './pages/cause-detail/cause-detail.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { VolunteerComponent } from './pages/volunteer/volunteer.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
const routes: Routes = [
  {
    path: '',
    title: 'Hero Fund',
    component: MainComponent,
    children: [
      {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
      },
      {
        path: 'about',
        title: 'About',
        component: AboutComponent,
      },
      {
        path: 'profile',
        title: 'Profile',
        component: ProfileComponent,
      },
      {
        path: 'contact-us',
        title: 'Contact Us',
        component: ContactUsComponent,
      },
      {
        path: 'event-detail',
        title: 'Event Detail',
        component: EventDetailComponent,
      },
      {
        path: 'volunteer',
        title: 'Volunteer',
        component: VolunteerComponent,
      },
      {
        path: 'payment-success',
        title: 'Payment Success',
        component: PaymentSuccessComponent,
      },
      {
        path: 'causes/:id',
        title: 'Cause Detail',
        component: CauseDetailComponent,
      },
      {
        path: 'causes',
        title: 'Causes',
        component: CausesComponent,
      },
    ],
  },
  {
    path: 'auth',
    title: 'Auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
