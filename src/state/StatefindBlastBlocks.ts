import { BlockSprite } from "../models/BlockSprite"

export default (game:any, sprite:BlockSprite, length:number):Array<BlockSprite> | false => {
    let {c,r} = sprite.getStatePositio()

    let result:Array<BlockSprite> = [sprite]

    //Left
    for(let colomn = c-1; colomn>=0; colomn--) { 
        if (game[colomn][r].id ===  game[c][r].id) {
            result.push(game[colomn][r])
        } else {
            colomn = -1
        }
    }

    //Right
    for(let colomn = c+1; colomn<game.length; colomn++) {
        if (game[colomn][r].id ===  game[c][r].id) {
            result.push(game[colomn][r])
        } else {
            colomn = game.length
        }
    }

    //Top
    for(let row = r-1; row>=0; row--) {
        if (game[c][row].id ===  game[c][r].id) {
            result.push(game[c][row])
        } else {
            row = -1
        }
    }

    //Bottom
    for(let row = r+1; row<game[c].length; row++) {
        if (game[c][row].id ===  game[c][r].id) {
            result.push(game[c][row])
        } else {
            row = game[c].length
        }
    }

    if (result.length >= length) return result
    return false
}