import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
const routes: Routes = [{
  path: 'about',
  title: 'About',
  component: AboutComponent,
}, {
  path: 'home',
  title: 'Home',
  component: HomeComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
