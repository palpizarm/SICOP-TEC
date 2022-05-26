import { Component, OnInit } from '@angular/core';
import { FavoriteInstitutionsManagementService } from 'src/app/Services/favorite-institutions-management.service';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-show-fav-institutions',
    templateUrl: './show-fav-institutions.component.html',
    styleUrls: ['./show-fav-institutions.component.css']
})
export class ShowFavInstitutionsComponent implements OnInit {

    page: number = 1;

    userID: number = 0;

    favInstitutionsList: any = [];

    institutionsList: any = []

    constructor(private _favInstitutionsService: FavoriteInstitutionsManagementService
    ) { }

    ngOnInit(): void {

        //local storage
        this.userID = parseInt(localStorage.getItem('userID'));

        this.loadFavInstitutions(this.userID);
        this.loadInstitutions();

    }

    loadFavInstitutions(userID: number) {
        this._favInstitutionsService.getFavorites(this.userID).subscribe(
            (data: any) => {
                this.favInstitutionsList = data.data.rows
                console.log(this.favInstitutionsList);
            }
        )

    }

    loadInstitutions() {
        this._favInstitutionsService.getInstitutions(this.favInstitutionsList).subscribe(
            (data: any) => {
                this.institutionsList = data.data.rows
                //console.log(this.institutionsList)
            }
        )
    }

    saveInstitution() {
        debugger
        let institutionSelect = document.getElementById("institutionSelect") as HTMLInputElement;
        let institutionName = institutionSelect.value;
        for (let i = 0; i < this.institutionsList.length; i++) {
            if (this.institutionsList[i].name == institutionName) {
                this._favInstitutionsService.createFavorite(this.userID, this.institutionsList[i].institution_id).subscribe(
                    (data: any) => {
                    }
                )
            }
        };
        location.reload();
    }

    deleteInstitutions() {

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
                for (let i = 0; i < inputList.length; i++) {
                    if (inputList[i].checked) {
                        let institutionID = parseInt(inputList[i].id);
                        this._favInstitutionsService.deleteFavorite(this.userID, institutionID).subscribe(
                            (data: any) => {
                                this.institutionsList = data.data.row;
                            }
                        )
                    }
                }
                Swal.fire(
                    'Eliminadas!',
                    'Las instituciones han sido eliminadas de su lista de favoritas.',
                    'success'
                )
                location.reload();
            }
        })

    }

}
