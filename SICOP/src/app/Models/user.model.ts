export class User {
    name: string;
    password: string;
    email: string;


    constructor(name:string, passsword:string, email:string) {
        this.name = name;
        this.password = passsword;
        this.email = email;
    }
}
