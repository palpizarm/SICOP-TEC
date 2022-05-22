import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShowUsersComponent } from './Components/show-users/show-users.component';
import { LoginPageComponent } from './Components/UserManagement/login-page/login-page.component';
import { CategoriesComponent } from './Components/PreferenceMagnament/categories/categories.component';
import { CategorieCardComponent } from './Components/PreferenceMagnament/categories/categorie-card/categorie-card.component';
import { CategorieEditComponent } from './Components/PreferenceMagnament/Categories/categorie-edit/categorie-edit.component';
import { FormsModule } from '@angular/forms';
import { CreatedMainteceAccountComponent } from './Components/UserRegistration/created-maintece-account/created-maintece-account.component';
import { HttpClientModule } from '@angular/common/http';
import { UserRegistrationComponent } from './Components/userRegistration/user-registration/user-registration.component';
import { ShowFavInstitutionsComponent } from './Components/show-fav-institutions/show-fav-institutions.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesListComponent } from './Components/categories-list/categories-list.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { ShowTendersComponent } from './Components/TenderManagement/show-tenders/show-tenders.component';
import { ShowFavTendersComponent } from './Components/TenderManagement/show-fav-tenders/show-fav-tenders.component';
import { HistoryTenderComponent } from './Components/History-tender/history-tender.component';
import { BrowserComponent } from './Components/browser/browser.component';
import { CategoriesToBrowseComponent } from './Components/categories-to-browse/categories-to-browse.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    CategoriesComponent,
    CategorieCardComponent,
    CategorieEditComponent,
    UserRegistrationComponent,
    CreatedMainteceAccountComponent,
    CreatedMainteceAccountComponent,
    ShowFavInstitutionsComponent,
    ShowFavInstitutionsComponent,
    ShowUsersComponent,
    ShowTendersComponent,
    ShowFavTendersComponent,
    CategoriesListComponent,
    UserProfileComponent,
    HistoryTenderComponent,
    BrowserComponent,
    CategoriesToBrowseComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
