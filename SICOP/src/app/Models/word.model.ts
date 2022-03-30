export class Word {

    constructor(word_id:number, word:string, category_id:number, dateCreated:string, deleted:number ) {
            this.word_id = word_id
            this.word = word
            this.category_id = category_id
            this.dateCreated = dateCreated
            this.deleted = deleted
        }

    word_id:number
    word:string
    category_id:number
    dateCreated:string
    deleted:number
}