export class Game{
    constructor(
                public _id: string,
                public name:string,
                public description:string,
                public imgUrl:string,
                public numberOfReviews: number,
                public reviewScore:number,
                public relatedPosts: [string],
                public steamLink:string,
    ){}
}