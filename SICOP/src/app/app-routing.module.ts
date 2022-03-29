import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatedMainteceAccountComponent } from './Components/UserRegistration/created-maintece-account/created-maintece-account.component';
import { UserRegistrationComponent } from './Components/userRegistration/user-registration/user-registration.component';
import { ShowUsersComponent } from './Components/show-users/show-users.component';


const routes: Routes = [
  {path: 'userRegistration', component: UserRegistrationComponent},
  {path: 'MainteceRegistration', component: CreatedMainteceAccountComponent},
  {path: 'showUsers',component:ShowUsersComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
