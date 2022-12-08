export enum PostType {
    Review = 'Review',
    Playing = 'Playing',
    Finished = 'Finished',
    Backlog = 'Backlog',
};

export class Post{
    constructor(public type: PostType,
                private userId: string,
                public user:string,
                private gameId: string,
                public game:string,
                public rating:number,
                public reviewText:string){
    }
}