import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [{
  path: 'home',
  title: 'Home',
  component: HomeComponent,
}, {
  path: 'about',
  title: 'About',
  component: AboutComponent,
}, {
  path: 'profile',
  title: 'Profile',
  component: ProfileComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
