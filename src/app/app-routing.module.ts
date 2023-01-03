import { Component, NgModule } from '@angular/core';
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
const routes: Routes = [
  {
    path: '',
    title: 'Herofun',
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
        children: [{
          path: 'detail',
          title: 'Cause Detail',
          component: CauseDetailComponent,
        }]
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
