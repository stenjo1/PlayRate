import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpInComponent } from './components/sign-up-in/sign-up-in.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CreatePostComponent }  from './components/create-post/create-post.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    SignUpInComponent,
    ProfilePageComponent,
    HeaderComponent,
    CreatePostComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
