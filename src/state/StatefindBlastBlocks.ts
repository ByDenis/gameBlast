import { BlockSprite } from "../models/BlockSprite"

export default (game:any, sprite:BlockSprite, length:number):Array<BlockSprite> | false => {
    let {c,r} = sprite.getStatePositio()

    let result:Array<BlockSprite> = [sprite]
    let horizontal_matches:number = 1
    let vertical_matches:number = 1

    //Left
    for(let colomn = c-1; colomn>=0; colomn--) { 
        if (game[colomn][r].id ===  game[c][r].id) {
            result.push(game[colomn][r])
            horizontal_matches++
        } else {
            colomn = -1
        }
    }

    //Right
    for(let colomn = c+1; colomn<game.length; colomn++) {
        if (game[colomn][r].id ===  game[c][r].id) {
            result.push(game[colomn][r])
            horizontal_matches++
        } else {
            colomn = game.length
        }
    }

    //Top
    for(let row = r-1; row>=0; row--) {
        if (game[c][row].id ===  game[c][r].id) {
            result.push(game[c][row])
            vertical_matches++
        } else {
            row = -1
        }
    }

    //Bottom
    for(let row = r+1; row<game[c].length; row++) {
        if (game[c][row].id ===  game[c][r].id) {
            result.push(game[c][row])
            vertical_matches++
        } else {
            row = game[c].length
        }
    }

    if (horizontal_matches>=length || vertical_matches>=length) return result
    return false
}