import { Scene,Utils } from "phaser"
import { BlockId } from "../gameConfig"
import { BlockSprite } from "../models/BlockSprite"

export default class FCreateBlock {
    private arrNextBlock:BlockId[] = []
    private _arrDefaultBlock:BlockId[] = []

    private _scaleGameBlock:number = 1

    constructor(scale:number, arrDefaultBlock:BlockId[]) {
        this._scaleGameBlock = scale
        this._arrDefaultBlock = arrDefaultBlock
    }

    public getNext = (scene: Scene, c:number, r:number, ):BlockSprite => {
        if (this.arrNextBlock.length === 0) this.arrNextBlock = this.generateNextBlocks()
        const id:any = this.arrNextBlock.pop()
        const scale = this._scaleGameBlock
        return new BlockSprite(scene, {id, scale}, {c, r})
    }

    private generateNextBlocks = ():BlockId[] => {
        return Utils.Array.Shuffle([...this._arrDefaultBlock])
    }
}