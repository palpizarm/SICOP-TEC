import { Options } from "../Models/options.model";

export class SidebarOptions {


    static getOptions(userType:string):Options[] {
        switch(userType) {
            case '3': {
                return [
                    { 
                        name: 'Buscar Licitaciones',
                        route: '/BrowseTenders'
                    },
                    {
                        name: "Licitaciones Favoritas",
                        route: "/FavTenders"
                    },
                    {
                        name: "Instituciones Favoritas",
                        route: "/FavInstitutions"
                    },
                    {
                        name: "Categorias Guardadas",
                        route: "/Categories"
                    },
                    {
                        name: "Historial de Busqueda",
                        route:  "/History"
                    }
                ]
            }
            case '2': {
                return [
                    {
                        name: "Lista de categorias",
                        route:  '/CategoriesList'
                    },
                    {
                        name: "Licitaciones",
                        route:  "/Tenders"
                    }
                ]
            }
            case '1': {
                return [
                    {
                        name: "Ver Usuarios",
                        route: "Users"
                    },
                    {
                        name: "Lista de categorias",
                        route:  '/CategoriesList'
                    },
                    {
                        name: "Licitaciones",
                        route:  "/Tender"
                    },
                    {
                        name: "Crear usuario de mantenimiento",
                        route:  "/MainteceRegistration"
                    }
                ]
            }
        }
    }
}

