export class User {
    constructor(public id: string,
                public username: string, 
                public name: string, 
                public email: string, 
                ) {} 

}

export class User1 {
    constructor(public username: string, public email: string, public password:string, public imageURL: string, public status:string, public finished:Int32List, public playing:Int32List, public backlog:Int32List, public reviews:Int32List) {}
}
