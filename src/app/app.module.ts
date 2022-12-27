import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './layout/body/body.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainContentComponent } from './layout/main-content/main-content.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { PreloaderContentComponent } from './layout/preloader-content/preloader-content.component';
import { AboutComponent } from './pages/about/about.component';

import { HomeComponent } from './pages/home/home.component';

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
