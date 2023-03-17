import { BlockPositon, StatePositionBlock } from "./BlockSprite"

export default (inState:StatePositionBlock, width:number, height:number):BlockPositon => {
    return {
        x: width/2 + width * inState.c,
        y: height/2 + height * inState.r
    }
}