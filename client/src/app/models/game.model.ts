export class Game{
    constructor(
                public _id: string,
                public name:string,
                public description:string,
                public imgUrl:string,
                public numberOfReviews: number,
                public reviewScore:number,
                public relatedPosts: [string],
                public playersNumber:number,
                public visitedNumber:number,
                public favoritesNumber:number,
                public likes:number
    ){
    }

   /* "_id": "63912e20fd5126d84fba6405",
    "name": "Fortnite",
    "description": "Best game ever made, victory royale",
    "imgUrl": "*url ka slici na serveru*",
    "numberOfReviews": 300000000,
    "reviewScore": 9.9 ,
    "relatedPosts": ["id jednog posta", "id nekog drugog posta itd"],
    "playersNumber": 0,
    "visitedNumber":0,
    "favoritesNumber": 0,
    "likes": 0 */
}