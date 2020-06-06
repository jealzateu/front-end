import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarUsersComponent } from './registrar-users/registrar-users.component';
import { ControlUsersComponent } from './control-users/control-users.component';

export const routes: Routes = [
  { path: ``, redirectTo: '/registrar', pathMatch: 'full' },
  {path: `registrar`, component: RegistrarUsersComponent},
  {path: `control`, component: ControlUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
