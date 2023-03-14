import { BlockSprite } from "../models/BlockSprite"

export default (game:any, sprite:BlockSprite, length:number):Array<BlockSprite> => {
    let {c,r} = sprite.getStatePositio()
    let result:Array<BlockSprite> = [sprite]

    //Horizontal
    let h_start = c-length>0?c-length:0
    let h_end = c+length+1<game.length?c+length+1:game.length-1
    for(let h=h_start; h<h_end; h++) {
        result.push(game[h][r])
    }

    //Vertical
    let v_start = r-length>0?r-length:0;
    let v_end = r+length+1<game[c].length?r+length+1:game[c].length-1
    for(let v=v_start; v<v_end; v++) {
        result.push(game[c][v])
    }

   return result;
}