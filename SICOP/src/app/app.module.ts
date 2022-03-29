import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesComponent } from './Components/PreferenceMagnament/categories/categories.component';
import { CategorieCardComponent } from './Components/PreferenceMagnament/categories/categorie-card/categorie-card.component';
import { CategorieEditComponent } from './Components/PreferenceMagnament/Categories/categorie-edit/categorie-edit.component';
import { FormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './Components/userRegistration/user-registration/user-registration.component';
import { CreatedMainteceAccountComponent } from './Components/UserRegistration/created-maintece-account/created-maintece-account.component';

import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategorieCardComponent,
    CategorieEditComponent,
    UserRegistrationComponent,
    CreatedMainteceAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
