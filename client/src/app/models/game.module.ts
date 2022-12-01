export class Game{
    constructor(public gameName:string,
                public bannerPosterUrl:string,
                public rating:number,
                public playersNumber:number,
                public visitedNumber:number,
                public favoritsNumber:number,
                public likes:number,
                public gameDescription:string){
    }
}