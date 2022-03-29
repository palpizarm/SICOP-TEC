export class Category {
    category_id: number
    name:string
    user_id:number
    deleted:number    
    dateCreated:string

    constructor() {
        this.category_id = 0
        this.name = ""
        this.user_id = 0
        this.deleted = 0   
        this.dateCreated = ""
    }
    
}