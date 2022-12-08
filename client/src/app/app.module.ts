import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpInComponent } from './components/sign-up-in/sign-up-in.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CreatePostComponent }  from './components/create-post/create-post.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SignUpInComponent,
    ProfilePageComponent,
    HeaderComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
