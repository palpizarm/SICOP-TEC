import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './Components/UserManagement/login-page/login-page.component';
import { CategorieEditComponent } from './Components/PreferenceMagnament/Categories/categorie-edit/categorie-edit.component';
import { CategoriesComponent } from './Components/PreferenceMagnament/categories/categories.component';
import { ShowFavInstitutionsComponent } from './Components/show-fav-institutions/show-fav-institutions.component';
import { CreatedMainteceAccountComponent } from './Components/UserRegistration/created-maintece-account/created-maintece-account.component';
import { UserRegistrationComponent } from './Components/userRegistration/user-registration/user-registration.component';
import { ShowUsersComponent } from './Components/show-users/show-users.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path: 'userRegistration', component: UserRegistrationComponent},
  { path: 'MainteceRegistration', component: CreatedMainteceAccountComponent},
  { path: 'Users',component:ShowUsersComponent},
  { path: "Categories", component: CategoriesComponent},
  { path: 'Categories/:id', component: CategorieEditComponent},
  { path: 'userRegistration', component: UserRegistrationComponent},
  { path: 'FavInstitutions', component: ShowFavInstitutionsComponent},
  { path: 'MainteceRegistration', component: CreatedMainteceAccountComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
