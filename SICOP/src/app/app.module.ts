import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserRegistrationComponent } from './Components/userRegistration/user-registration/user-registration.component';
import { FormsModule } from '@angular/forms';
import { CreatedMainteceAccountComponent } from './Components/UserRegistration/created-maintece-account/created-maintece-account.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowFavInstitutionsComponent } from './Components/show-fav-institutions/show-fav-institutions.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
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
