import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './components/game-page/game-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SignUpInComponent } from './components/sign-up-in/sign-up-in.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserAuthentificatedGuard } from './guards/user-authentificated.guard';

const routes: Routes = [
  {path:'', component:SignUpInComponent},
  {path: 'homepage', component:HomePageComponent, canActivate: [UserAuthentificatedGuard]},
  {path:'gamepage', component:GamePageComponent, canActivate: [UserAuthentificatedGuard]},
  {path:'profilepage', component:ProfilePageComponent, canActivate: [UserAuthentificatedGuard]},
  {path:'createpost', component:CreatePostComponent, canActivate: [UserAuthentificatedGuard]},
  {path:'gamepage/:gameId',component:GamePageComponent,canActivate: [UserAuthentificatedGuard]},
  {path:'profilepage/:userName', component:ProfilePageComponent, canActivate: [UserAuthentificatedGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
