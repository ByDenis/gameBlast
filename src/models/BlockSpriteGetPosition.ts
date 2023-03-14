import { BlockPositon } from "./BlockSprite"

export default (colomn:number, row:number, width:number, height:number):BlockPositon => {
    return {
        x: width/2 + width * colomn,
        y: height/2 + height * row
    }
}