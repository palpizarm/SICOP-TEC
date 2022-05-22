import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PreferencesManagementService } from 'src/app/Services/preferences-management.service';

@Component({
  selector: 'app-categories-to-browse',
  templateUrl: './categories-to-browse.component.html',
  styleUrls: ['./categories-to-browse.component.css']
})
export class CategoriesToBrowseComponent implements OnInit {

  @Output() listEvent = new EventEmitter<JSON[]>();
  userCategories:[] = [];
  Categories:[]=[];
  selectedCategories:any[]=[];

  constructor(private categoriesService: PreferencesManagementService) {
    
   }

  ngOnInit(): void {
    this.getCategories();
    this.getUserCategories();
  }

  getUserCategories() {
    this.categoriesService.getCategories(Number(localStorage.getItem('userID')))
    .subscribe((data:any) => {
      if (data.code > 0) {
        this.userCategories = data.data.rows;
      }
    })
  }

  getCategories() {
    this.categoriesService.getCategories(-1)
    .subscribe((data:any) => {
      if (data.code > 0) {
        this.Categories = data.data.rows;
      }
    })
  }

  addCategories(){
    this.listEvent.emit(this.selectedCategories);
  }

  selectedItem(item:any) {
    this.selectedCategories.push(item);
  }


  removeItem(item:any) {
    this.selectedCategories = this.selectedCategories.filter((element:any) => {
      element.id != item.id
    })
  }

}
