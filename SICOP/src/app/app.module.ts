import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './Components/UserManagement/login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesComponent } from './Components/PreferenceMagnament/categories/categories.component';
import { CategorieCardComponent } from './Components/PreferenceMagnament/categories/categorie-card/categorie-card.component';
import { CategorieEditComponent } from './Components/PreferenceMagnament/Categories/categorie-edit/categorie-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserRegistrationComponent } from './Components/userRegistration/user-registration/user-registration.component';
import { CreatedMainteceAccountComponent } from './Components/UserRegistration/created-maintece-account/created-maintece-account.component';
import { ShowFavInstitutionsComponent } from './Components/show-fav-institutions/show-fav-institutions.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CategoriesComponent,
    CategorieCardComponent,
    CategorieEditComponent,
    UserRegistrationComponent,
    CreatedMainteceAccountComponent,
    ShowFavInstitutionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
