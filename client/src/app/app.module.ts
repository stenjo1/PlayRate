import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GamePageComponent } from './components/game-page/game-page.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpInComponent } from './components/sign-up-in/sign-up-in.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { HeaderComponent } from './components/header/header.component';
import { CreatePostComponent }  from './components/create-post/create-post.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { HomePageComponent } from './components/home-page/home-page.component';

import { AuthService } from './services/auth.service';
import { PostComponent } from './components/post/post.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpInComponent,
    ProfilePageComponent,
    GamePageComponent,
    HeaderComponent,
    CreatePostComponent,
    GamePageComponent,
    HomePageComponent,
    PostComponent,
    EditReviewComponent
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
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
