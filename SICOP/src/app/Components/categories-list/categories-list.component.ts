import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category.model';
import { PreferencesManagementService } from 'src/app/Services/preferences-management.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  page:number = 1
  categoriesList:Category[] = []


  constructor(private preferenceService : PreferencesManagementService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    if (localStorage.getItem('userID')) {
      // get the admin categories in the db, the mantaince and admin have access to the same categories.
      this.preferenceService.getCategories(-1)
        .subscribe((data: any) => {
          this.categoriesList = data.data.rows
        })
    }
  }

  deleteCategories() {
    Swal.fire({
      title: '¿Esta seguro?',
      text: "Una vez eliminadas no podrá revetirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimnar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        let inputList = document.getElementsByTagName("input");
        for(let i=0;i<inputList.length;i++)
        {
          if(inputList[i].checked)
          {
            this.preferenceService.deleteCategory(parseInt(inputList[i].id))
              .subscribe((data:any) => {
                this.loadCategories();
              })
          }
        }
        Swal.fire(
          'Eliminadas!',
          'Las categorias han sido eliminadas de la lista',
          'success'
        )
      }
    })
  }

}
