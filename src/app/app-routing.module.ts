import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CausesComponent } from './pages/causes/causes.component';
import { CauseDetailComponent } from './pages/cause-detail/cause-detail.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { VolunteerComponent } from './pages/volunteer/volunteer.component';
import { LoginComponent } from './layout/auth/login/login.component';
import { RegisterComponent } from './layout/auth/register/register.component';
import { AuthGuard } from '../app/shared/helpers';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { ErrorComponent } from './pages/error/error.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';
import { SponsorComponent } from "./pages/sponsor/sponsor.component";
import { SponsorDetailComponent } from "./pages/sponsor-detail/sponsor-detail.component";
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
        canActivate: [AuthGuard],
      },
      {
        path: 'contact-us',
        title: 'Contact Us',
        component: ContactUsComponent,
      },
      {
        path: 'article-detail/:id',
        title: 'Article Detail',
        component: ArticleDetailComponent,
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
      {
        path: 'payment/:id',
        title: 'Payment Form',
        component: PaymentFormComponent,
      },
      {
        path: 'sponsor',
        title: 'Sponsor',
        component: SponsorComponent,
      },
      {
        path: 'sponsor/:id',
        title: 'Sponsor',
        component: SponsorDetailComponent,
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
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
