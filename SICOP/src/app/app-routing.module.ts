import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CategorieEditComponent } from './Components/PreferenceMagnament/Categories/categorie-edit/categorie-edit.component';
import { CategoriesComponent } from './Components/PreferenceMagnament/categories/categories.component';


const routes: Routes = [
  { path: "Categories", component: CategoriesComponent},
  { path: 'Categories/:id', component: CategorieEditComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
