import { BlockPositon, StatePositionBlock } from "./BlockSprite"

export default (inState:StatePositionBlock, widthBlock:number, heightBlock:number):BlockPositon => {
    return {
        x: widthBlock/2 + widthBlock * inState.c,
        y: heightBlock/2 + heightBlock * inState.r
    }
}