import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieEditComponent } from './Components/PreferenceMagnament/Categories/categorie-edit/categorie-edit.component';
import { CategoriesComponent } from './Components/PreferenceMagnament/categories/categories.component';
import { ShowFavInstitutionsComponent } from './Components/show-fav-institutions/show-fav-institutions.component';
import { CreatedMainteceAccountComponent } from './Components/UserRegistration/created-maintece-account/created-maintece-account.component';
import { UserRegistrationComponent } from './Components/userRegistration/user-registration/user-registration.component';


const routes: Routes = [
  { path: "Categories", component: CategoriesComponent},
  { path: 'Categories/:id', component: CategorieEditComponent},
  { path: 'userRegistration', component: UserRegistrationComponent},
  { path: 'showFavInstitutions', component: ShowFavInstitutionsComponent},
  { path: 'MainteceRegistration', component: CreatedMainteceAccountComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
