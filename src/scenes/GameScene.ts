import { Scene } from 'phaser'
import FCreateBlock from '../factory/FCreateBlock'
import gameConfig from '../gameConfig'
import { BlockSprite } from '../models/BlockSprite'
import State from '../state/State'
import onBlast from './game/onBlast'
import onBomb from './game/onBomb'
import setEmptyBlocks from './game/setEmptyBlocks'

export class GameScene extends Scene {
  constructor() {
    super('GameScene')
  }
  
  createrBlock:FCreateBlock
  state = State.getInstance()
  
  onStartGame = ():void => {

    this.createrBlock = new FCreateBlock(//Генератор игровых блоков
      this.state.scale, 
      ['1','2','3','4','5']
    )

    this.state.initGame(gameConfig.colomns, gameConfig.rows)

    for (let c=0; c<gameConfig.colomns; c++) {
      for (let r=0; r<gameConfig.rows; r++) {
        this.state.saveBlock( this.createrBlock.getNext(this, c, r) )
      }
    }

    this.input.on('gameobjectdown', this.onBlockClick)
  }

  create() {
    this.onStartGame()
  }

  onBlockClick = async (_: unknown, sprite:BlockSprite )  => {
    this.input.off('gameobjectdown', this.onBlockClick)

    if (this.state.bomb === true) {
      await onBomb(this, sprite, gameConfig.bombRadius)
    } else {
      await onBlast(this, sprite, gameConfig.groupLengthToWin, gameConfig.addBombLength)
    }

    setEmptyBlocks(this, gameConfig.colomns, gameConfig.rows)

    if (this.state.point >= gameConfig.pointsНoWin) {
      console.log('win');
    } else if (this.state.steps <= 0) {
      console.log('over');
    } else {
      this.input.on('gameobjectdown', this.onBlockClick)
    }
  }

}