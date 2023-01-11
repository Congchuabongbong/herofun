import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CausesComponent } from './pages/causes/causes.component';
import { CauseDetailComponent } from './pages/cause-detail/cause-detail.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { VolunteerComponent } from './pages/volunteer/volunteer.component';
import { LoginComponent } from './layout/auth/login/login.component';
import { RegisterComponent } from './layout/auth/register/register.component';

import { AuthGuard } from '../app/shared/helpers';

const routes: Routes = [
  {
    path: '',
    title: 'Herofund',
    component: MainComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
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
        canActivate: [AuthGuard],
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
        path: 'causes',
        title: 'Causes',
        component: CausesComponent,
        children: [
          {
            path: 'detail',
            title: 'Cause Detail',
            component: CauseDetailComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
