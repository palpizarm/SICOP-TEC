import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PreferencesManagementService } from 'src/app/Services/preferences-management.service';

@Component({
  selector: 'app-categories-to-browse',
  templateUrl: './categories-to-browse.component.html',
  styleUrls: ['./categories-to-browse.component.css']
})
export class CategoriesToBrowseComponent implements OnInit {

  @Output() listEvent = new EventEmitter<JSON[]>();
  
  private eventsSubscription: Subscription;
  @Input() events: Observable<void>;
  userCategories:[] = [];
  categories:[]=[];
  selectedCategory = {name: '', words: []};
  selectedCategories: any[] = [];

  constructor(private categoriesService: PreferencesManagementService) {
    
   }

  ngOnInit(): void {
    this.getCategories();
    this.getUserCategories();

    this.eventsSubscription = this.events.subscribe((id:any) => {
        this.removeCheckeddMark(id)
    })
  }

  removeCheckeddMark(id) {
    let inputList = document.getElementsByTagName("input");
    for(let i=0;i<inputList.length;i++) {
      if(inputList[i].checked && inputList[i].id == id) {
        inputList[i].checked = false
      }
    }
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
        this.categories = data.data.rows;
      }
    })
  }

  showWords(id:string, name: string){
    this.selectedCategory.words = []
    this.categoriesService.getWords(Number(id))
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.selectedCategory.name = name
          let items:any[] = data.data.rows
          for(let i = 0; i <items.length; i++)
            this.selectedCategory.words.push(items[i].word)
        } else {
          console.error(data.msg)
        }
      })
  }

  emitEvent(){
    this.listEvent.emit(this.selectedCategories);
  }

  categoryAction(event:any, item:any) {
    if(event.target.checked) {
      this.selectedCategories.push(item)
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (element:any) => element.category_id != item.category_id
      )
    }
    this.emitEvent()
  }

}
