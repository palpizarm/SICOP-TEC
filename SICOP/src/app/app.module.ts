import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesComponent } from './Components/PreferenceMagnament/categories/categories.component';
import { CategorieCardComponent } from './Components/PreferenceMagnament/categories/categorie-card/categorie-card.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategorieCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
