import { BlockSprite } from "../models/BlockSprite"

export default (game:any):Array<BlockSprite> | null => {
    let ret:BlockSprite[] = []

    for (let c=0; c<game.length; c++) {
        
        let move = 0;
        for (let r = game[c].length-1; r>=0; r--) {
            if (!game[c][r]) {
                move++
            } else if (move > 0) {
                game[c][r+move] = game[c][r]
                game[c][r+move].setStatePositionY(r+move)
                game[c][r] = null
                
                ret.push(game[c][r+move])
            }
        }

    }
    if (ret.length>0) return ret
    return null
}