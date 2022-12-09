export class User {
    constructor(public id: string,
                public username: string, 
                public name: string, 
                public email: string, 
                ) {} 

}

export class User1 {
    constructor(public username: string, public email: string, public password:string, public imageURL: string, public status:string) {}
}
