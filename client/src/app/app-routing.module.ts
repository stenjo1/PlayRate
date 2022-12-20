import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './components/game-page/game-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SignUpInComponent } from './components/sign-up-in/sign-up-in.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {path:'', component:SignUpInComponent},
  {path: 'homepage', component:HomePageComponent},
  {path:'gamepage', component:GamePageComponent},
  {path:'profilepage', component:ProfilePageComponent},
  {path:'createpost', component:CreatePostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
