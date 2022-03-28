import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import { UserRegistrationComponent } from './Components/userRegistration/user-registration/user-registration.component';
import { FormsModule } from '@angular/forms';
import { CreatedMainteceAccountComponent } from './Components/UserRegistration/created-maintece-account/created-maintece-account.component';
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> develop


@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    CreatedMainteceAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    FormsModule
=======
    HttpClientModule
>>>>>>> develop
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
