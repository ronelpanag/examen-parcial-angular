import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {path: "", component: WelcomeComponent},
  {path: "user", component: FormComponent},
  {path: "user/:id", component: UserDetailsComponent},

  {path: "**", redirectTo: "user"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
