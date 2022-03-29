export class Category {
    category_id: number
    name:string
    user_id:number
    deleted:number    
    dateCreated:string

    constructor(category_id = 0, name = '', user_id = 0, deleted = 0, dateCreated = '') {
        this.category_id = category_id
        this.name = name
        this.user_id = user_id
        this.deleted = deleted   
        this.dateCreated = dateCreated
    }  
    
}