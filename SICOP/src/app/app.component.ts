import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SICOP';


  options: string[] = ["Buscar Licitaciones","Licitaciones Favoritas","Instituciones Favoritas","Categorias Guardadas","Historial de Busqueda"]
  displaySidebar: boolean = true;
  isLogged: boolean = false;

  constructor() {}
}
