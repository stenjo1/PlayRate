import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './components/game-page/game-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SignUpInComponent } from './components/sign-up-in/sign-up-in.component';

const routes: Routes = [
  {path:'',component:SignUpInComponent},
  {path:'gamepage',component:GamePageComponent},
  {path:'profilepage',component:ProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
