import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './Components/UserManagement/login-page/login-page.component';
import { CategorieEditComponent } from './Components/PreferenceMagnament/Categories/categorie-edit/categorie-edit.component';
import { CategoriesComponent } from './Components/PreferenceMagnament/categories/categories.component';
import { ShowFavInstitutionsComponent } from './Components/show-fav-institutions/show-fav-institutions.component';
import { CreatedMainteceAccountComponent } from './Components/UserRegistration/created-maintece-account/created-maintece-account.component';
import { UserRegistrationComponent } from './Components/userRegistration/user-registration/user-registration.component';
import { ShowUsersComponent } from './Components/show-users/show-users.component';
import { IsLoggedGuard } from './Guard/is-logged.guard';

const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path: 'userRegistration', component: UserRegistrationComponent},
  { path: 'MainteceRegistration', component: CreatedMainteceAccountComponent, canActivate: [IsLoggedGuard]},
  { path: 'Users',component:ShowUsersComponent, canActivate: [IsLoggedGuard]},
  { path: "Categories", component: CategoriesComponent, canActivate: [IsLoggedGuard]},
  { path: 'Categories/:id', component: CategorieEditComponent, canActivate: [IsLoggedGuard]},
  { path: 'userRegistration', component: UserRegistrationComponent, canActivate: [IsLoggedGuard]},
  { path: 'MainteceRegistration', component: CreatedMainteceAccountComponent, canActivate: [IsLoggedGuard]},
  { path: 'showFavInstitutions', component: ShowFavInstitutionsComponent, canActivate: [IsLoggedGuard]},
  { path: 'FavInstitutions', component: ShowFavInstitutionsComponent, canActivate: [IsLoggedGuard]},
  { path: 'MainteceRegistration', component: CreatedMainteceAccountComponent, canActivate: [IsLoggedGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'FavInstitutions'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
