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


  constructor(private categoriesService : PreferencesManagementService) { }

  ngOnInit(): void {
    this.categoriesList.push(new Category(4,'test'))
    
  }

  loadCategories() {

  }

  deleteCategories() {
    Swal.fire({
      title: '¿Esta seguro?',
      text: "Una vez eliminadas no podrá revetirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalas!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        let inputList = document.getElementsByTagName("input");
        for(let i=0;i<inputList.length;i++)
        {
          if(inputList[i].checked)
          {
            // call the service
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
