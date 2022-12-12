export class User {
    constructor(public id: string,
                public username: string, 
                public name: string, 
                public email: string, 
                ) {} 

}
//TOFIX this is here just as placeholder for the other classes that used User before 
// Eventualy User will look like User1 after sign-up/in is implemented!
export class User1 {
    constructor(public username: string, public email: string, public password:string, public imageURL: string, public status:string) {}
}
