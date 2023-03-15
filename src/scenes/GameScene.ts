import { Scene } from 'phaser'
import FCreateBlock from '../factory/FCreateBlock'
import gameConfig from '../gameConfig'
import { BlockSprite } from '../models/BlockSprite'
import BlockSpriteMoveAll from '../models/BlockSpriteMoveAll'
import State from '../state/State'
import StateFindSolution from '../state/StateFindSolution'
import StateNewGame from '../state/StateNewGame'
import StateShuffleGame from '../state/StateShuffleGame'
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
    StateNewGame(this.state, gameConfig);
    
    if (this.state.getGame() !== undefined) {
      this.input.off('gameobjectdown', this.onBlockClick)

      for (let c=0; c<gameConfig.colomns; c++) {
        for (let r=0; r<gameConfig.rows; r++) {
          let block = this.state.getBlock({c, r});
          if (block !== null) {
            block.destroy(true);
            this.state.clearBlock({c, r});
          }
        }
      }
    }

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
    this.initEvents();
  }

  onBlockClick = async (_: unknown, sprite:BlockSprite )  => {
    this.input.off('gameobjectdown', this.onBlockClick)

    if (this.state.bomb === true) {
      await onBomb(this, sprite, gameConfig.bombRadius)
      this.state.bomb = false;
    } else {
      await onBlast(this, sprite, gameConfig.groupLengthToWin, gameConfig.addBombLength)
    }

    if (this.state.point >= gameConfig.pointsToWin) {

      console.log('win');

    } else {

      setEmptyBlocks(this, gameConfig.colomns, gameConfig.rows)
  
      //Проверка есть ли решение
      while ( StateFindSolution(this.state.getGame(), gameConfig.groupLengthToWin) === false && this.state.shuffleCount > -1) {
          this.state.shuffleUse();
          this.state.setGame = StateShuffleGame(this.state.getGame())
          BlockSpriteMoveAll(this.state.getGame());
      }
  
      if (this.state.steps <= 0 || this.state.shuffleCount <= -1) {
        console.log('over');
      } else {
        this.input.on('gameobjectdown', this.onBlockClick)
      }

    }
  }

  onBomb = () => {
    this.state.bombUse();
  }

  initEvents() {
      let startBtn:HTMLElement|null = document.getElementById('start-game')
      if (startBtn !== null ) startBtn.addEventListener("click", this.onStartGame)

      let bombBtn:HTMLElement|null = document.getElementById('game-bomb')
      if (bombBtn !== null ) bombBtn.addEventListener("click", this.onBomb)
  }

}