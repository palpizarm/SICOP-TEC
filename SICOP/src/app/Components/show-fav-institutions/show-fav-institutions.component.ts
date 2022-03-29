import { Component, OnInit } from '@angular/core';
import { FavoriteInstitutionsManagementService } from 'src/app/Services/favorite-institutions-management.service';

@Component({
  selector: 'app-show-fav-institutions',
  templateUrl: './show-fav-institutions.component.html',
  styleUrls: ['./show-fav-institutions.component.css']
})
export class ShowFavInstitutionsComponent implements OnInit {

  page:number = 1;

  userID:number = 0;

  favInstitutionsList:any = [{},{},{}]

  institutionsList:any = []

  constructor( private _favInstitutionsService : FavoriteInstitutionsManagementService
  ) { }

  ngOnInit(): void {

    //local storage

    // this.loadFavInstitutions(this.userID);
    // this.loadInstitutions(this.favInstitutionsList);

    this.loadInstitutions();

  }

  loadFavInstitutions(userID:number){
    this._favInstitutionsService.getFavorites(this.userID).subscribe(
      (data:any) => {
        this.favInstitutionsList = data.data.rows
      }
    )

  }

  loadInstitutions()
  {
    this._favInstitutionsService.getInstitutions().subscribe(
      (data:any) => {
        this.institutionsList = data.data.rows
        console.log(this.institutionsList)
      }
    )
  }

  saveInstitution()
  {
    let institutionSelect = document.getElementById("institutionSelect") as HTMLInputElement;
    let institutionName = institutionSelect.value;

    this.institutionsList.forEach(i => {
      if(i.name == institutionName)
      {
        console.log(i);
        // this._favInstitutionsService.createFavorite(this.userID,i.institution_id).subscribe(
        //   (data:any) => {
        //     console.log(data);
        //   }
        // )

      }
      
    });

  }

}
