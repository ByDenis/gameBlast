import State, { GameData } from "../../state/State";
import BlockSpriteBlast from "../../models/BlockSpriteBlast"
export default (game:GameData, state:State) => {

    return new Promise((resolve) => {
        let allPromise:any = []
        for (let gameColomn of game) {
            for(let gameBlock of gameColomn) {
                if (gameBlock !== null) {
                    state.clearBlock(gameBlock.getStatePositio())
                    allPromise.push( BlockSpriteBlast(gameBlock) )
                }
            }
        }
        Promise.all(allPromise).then(resolve)
    }) 
}