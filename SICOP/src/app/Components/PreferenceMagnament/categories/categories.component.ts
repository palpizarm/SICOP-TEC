import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category.model';
import { PreferencesManagementService } from 'src/app/Services/preferences-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  categories: Category[] = []
  constructor(private preferenceService: PreferencesManagementService) { }

  ngOnInit(): void {
    if (localStorage.getItem('userID')) {
      this.preferenceService.getCategories(parseInt(localStorage.getItem('userID')))
        .subscribe((data: any) => {
          this.categories = data.data.rows
        })
    }

  }

  updateList() {
    if (localStorage.getItem('userID')) {
      Swal.fire({ text: 'Cargando...', allowOutsideClick: false })
      Swal.showLoading()
      this.preferenceService.getCategories(parseInt(localStorage.getItem('userID')))
        .subscribe((data: any) => {
          this.categories = data.data.rows
        })
      Swal.close()
    }

  }
}
