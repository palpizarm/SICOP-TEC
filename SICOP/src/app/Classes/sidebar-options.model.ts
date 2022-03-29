import { Options } from "../Models/options.model";

export class SidebarOptions {


    static getOptions(userType:string):Options[] {
        switch(userType) {
            case 'Cliente': {
                return [
                    { 
                        name: 'Buscar Licitaciones',
                        route: '/search'
                    },
                    {
                        name: "Licitaciones Favoritas",
                        route: "/tenders"
                    },
                    {
                        name: "Instituciones Favoritas",
                        route: "/Institutions"
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
            case 'Mantenimiento': {
                return [
                    {
                        name: "Lista de categorias",
                        route:  '/CategoriesList'
                    },
                    {
                        name: "Licitaciones",
                        route:  "/Tender"
                    }
                ]
            }
            case 'Administrador': {
                return [
                    {
                        name: "Ver Usuarios",
                        route: "UsersList"
                    },
                    {
                        name: "Lista de categorias",
                        route:  '/CategoriesList'
                    },
                    {
                        name: "Licitaciones",
                        route:  "/Tender"
                    }
                ]
            }
        }
    }
}

