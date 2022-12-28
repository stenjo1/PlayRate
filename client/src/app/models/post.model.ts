export enum PostType 
{
    NoType = 'NoType',
    Review = 'Review',
    Playing = 'Playing',
    Finished = 'Finished',
    Backlog = 'Backlog',
};

export class Post{
    
    constructor(public _id: string,
                public postType: PostType,
                public username: string,
                public gameName: string,
                public reviewText:string,
                public reviewScore:number,
                public postTimestamp: Date){
    }
}