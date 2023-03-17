import { GameObjects, Scene } from 'phaser'
import { BlockId } from '../gameConfig'
import BlockSpriteGetPosition from './BlockSpriteGetPosition'


export type BlockPositon = { x: number, y: number }
export type BlockSize = { width: number, height: number }
export type BlockProps = { id: BlockId } & {scale?: number}
export type StatePositionBlock = {c: number, r:number}

export class BlockSprite extends GameObjects.Sprite {
    readonly id: BlockId
    private inState: StatePositionBlock

    private blockSize:BlockSize;
    get size(): BlockSize { return this.blockSize }
    set size(blockSize:BlockSize) { this.blockSize = blockSize }

    constructor(scene: Scene, props: BlockProps, inState: StatePositionBlock) {
        const {id, scale=1 } = props
        
        const blockTexture = scene.textures.get('tile'+id).getSourceImage()

        const position:BlockPositon = BlockSpriteGetPosition(
            inState, 
            blockTexture.width * scale,
            blockTexture.height * scale
        );

        super(scene, position.x, position.y, 'tile'+id)

        this.blockSize = { width: blockTexture.width * scale, height: blockTexture.height * scale }

        this.inState = inState
        this.id = id
        this.scale = 0
        this.scene.add.existing(this)
        this.show(scale).then(() => this.setInteractive())
    }

    public getStatePositio = ():StatePositionBlock => {
        return this.inState
    }
    public setStatePositionY = (r:number): void => {
        this.inState.r = r
    }
    public setStatePosition = (c:number, r:number): void => {
        this.inState.c = c
        this.inState.r = r
    }

    show = (scale:number) => {
        return new Promise((resolve) => {
            this.scene.tweens.add({
            targets: this,
            ease: 'Linear',
            scale: scale-0.01,
            duration: 300,
            onComplete:resolve
            })
        }) 
    } 
}
