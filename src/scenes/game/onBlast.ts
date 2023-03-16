import { BlockSprite } from "../../models/BlockSprite"
import BlockSpriteBlast from "../../models/BlockSpriteBlast"
import findBlastBlocks from '../../state/StateFindBlastBlocks'
import BlockSpriteMove from '../../models/BlockSpriteMove'
import BlockSpriteNoBlast from '../../models/BlockSpriteNoBlast'
import moveDownBlocks from '../../state/StateMoveDownBlocks'
import { GameScene } from "../GameScene"
import calcPoint from "./calcPoint"

export default (scene: GameScene, sprite: BlockSprite, lengthToWin: number, addBombLength: number) => {
    return new Promise((resolve) => {
        const blockNeedsBlast = findBlastBlocks(scene.state.getGame(), sprite, lengthToWin)

        if (blockNeedsBlast) {
            if (blockNeedsBlast.length >= addBombLength) scene.state.bombPlus()
            scene.state.pointAdd(calcPoint(blockNeedsBlast.length))

            let allPromise: any = []
            for (let s of blockNeedsBlast) {
                scene.state.clearBlock(s.getStatePositio())
                allPromise.push(BlockSpriteBlast(s))
            }

            Promise.all(allPromise).then(() => {
                for (let s of blockNeedsBlast) s.destroy()
                let blockNeedsMove = moveDownBlocks(scene.state.getGame())

                let allPromiseMove: any = [];
                if (blockNeedsMove) for (let s of blockNeedsMove) {
                    allPromiseMove.push(BlockSpriteMove(s))
                }
                Promise.all(allPromiseMove).then(resolve)

                scene.state.stepAdd();
            });
        } else {
            BlockSpriteNoBlast(sprite).then(resolve)
        }
    });
}

