export class Category {

    constructor(category_id: number, name:string, user_id:number,  deleted:number, dateCreated:string) {
        this.category_id = category_id
        this.name = name
        this.user_id = user_id
        this.deleted = deleted
        this.dateCreated = dateCreated    
    }

    category_id: number
    name:string
    user_id:number
    deleted:number    
    dateCreated:string
}