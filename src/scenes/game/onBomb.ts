import { GameScene } from "../GameScene"
import { BlockSprite } from "../../models/BlockSprite"
import BlockSpriteBlast from "../../models/BlockSpriteBlast"
import BlockSpriteMove from '../../models/BlockSpriteMove'
import findBombBlocks from "../../state/StateFindBombBlocks"
import moveDownBlocks from '../../state/StateMoveDownBlocks'

export default (scene: GameScene, sprite: BlockSprite, bombRadius: number) => {
    return new Promise((resolve) => {
        const blockNeedsBomb = findBombBlocks(scene.state.getGame(), sprite, bombRadius)

        let allPromise: any = [];
        for (let s of blockNeedsBomb) {
            scene.state.clearBlock(s.getStatePositio())
            allPromise.push(BlockSpriteBlast(s))
        }

        Promise.all(allPromise).then(() => {
            for (let s of blockNeedsBomb) s.destroy();
            let blockNeedsMove = moveDownBlocks(scene.state.getGame())

            let allPromiseMove: any = []
            if (blockNeedsMove) for (let s of blockNeedsMove) {
                allPromiseMove.push(BlockSpriteMove(s))
            }
            scene.state.bombMinus();
            Promise.all(allPromiseMove).then(resolve)
        })
    })
}