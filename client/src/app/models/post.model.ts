export enum PostType 
{
    NoType = 'NoType',
    Review = 'Review',
    Playing = 'Playing',
    Finished = 'Finished',
    Backlog = 'Backlog',
};

export class Post{
    constructor(public type: PostType,
                public userId: string,
                public gameId: string,
                public rating:number,
                public reviewText:string){
    }
}