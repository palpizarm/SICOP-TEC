import { Component } from '@angular/core';
import { SidebarOptions } from './Classes/sidebar-options.model';
import { Options } from './Models/options.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SICOP';

  options: Options[] = SidebarOptions.getOptions('Cliente')

  displaySidebar: boolean = true;
  isLogged: boolean = true;

  constructor() {}
}
