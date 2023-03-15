import findBlastBlocks from './StateFindBlastBlocks'

export default (game:any, lengthToWin:number):boolean => {

    for (let arrSprite of game) {
        for (let sprite of arrSprite) {
            if (findBlastBlocks(game, sprite, lengthToWin) !== false) return true;
        }
    }
    
    return false
}

