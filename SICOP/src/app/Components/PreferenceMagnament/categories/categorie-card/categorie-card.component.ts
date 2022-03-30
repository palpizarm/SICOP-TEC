import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category.model';
import { PreferencesManagementService } from 'src/app/Services/preferences-management.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrls: ['./categorie-card.component.css']
})
export class CategorieCardComponent implements OnInit {

  @Input() category: Category;
  @Output() deleted = new EventEmitter<boolean>();
  
  constructor(private router: Router, private preferenceService: PreferencesManagementService) { }

  ngOnInit(): void {
  }


  parseTime(date: string) {

    const ye = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(Date.parse(date))
    const mo = new Intl.DateTimeFormat('es', { month: 'long' }).format(Date.parse(date))
    const da = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(Date.parse(date))
    return (`${da} de ${mo}, ${ye}`)

  }

  remove() {

    Swal.fire({
      text: `¿Esta seguro que desea eliminar la categoria '${this.category.name}'?`,
      icon: 'question',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((resp) => {
      if (resp.isConfirmed) {
        this.preferenceService.deleteCategory(this.category.category_id)
          .subscribe((data: any) => {
            if (data.code > 0) {
              Swal.fire({ text: "Categoria eliminada con exito", icon: 'success', confirmButtonText: 'Aceptar' })
              this.deleted.emit(true)
            }
            else {
              Swal.fire({ text: "Ha surguido un error, intentelo de nuevo", icon: 'error', confirmButtonText: 'Aceptar' })
            }
          })
      }
    })

  }

}
