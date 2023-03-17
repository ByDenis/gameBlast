import { Scene } from 'phaser'
import CreateBlockFactory from '../factory/CreateBlockFactory'
import gameConfig from '../gameConfig'
import { BlockSprite } from '../models/BlockSprite'
import BlockSpriteMoveAll from '../models/BlockSpriteMoveAll'
import State from '../state/State'
import StateFindSolution from '../state/StateFindSolution'
import StateNewGame from '../state/StateNewGame'
import StateShuffleGame from '../state/StateShuffleGame'
import { UI } from '../ui/UI'
import clearGame from './game/clearGame'
import onBlast from './game/onBlast'
import onBomb from './game/onBomb'
import setEmptyBlocks from './game/setEmptyBlocks'

export class GameScene extends Scene {

    public state: State
    public createrBlock: CreateBlockFactory
    private ui: UI

    constructor() {
        super('GameScene')
        this.state = State.getInstance()
        this.ui = new UI();

        this.ui.showModalWindow('game-start')
    }

    onStartGame = (): void => {

        this.ui.hideModalWindow();

        StateNewGame(this.state, gameConfig);

        if (this.state.getGame() !== undefined) {
            this.input.off('gameobjectdown', this.onBlockClick)
            clearGame(this.state.getGame(), this.state)
        }

        if (this.createrBlock === undefined) this.createrBlock = new CreateBlockFactory(//Генератор игровых блоков
            this.state.scale,
            gameConfig.arrGameBlockType
        )

        this.state.initGame(gameConfig.colomns, gameConfig.rows)

        for (let c = 0; c < gameConfig.colomns; c++) {
            for (let r = 0; r < gameConfig.rows; r++) {
                this.state.saveBlock(this.createrBlock.getNext(this, c, r))
            }
        }

        this.input.on('gameobjectdown', this.onBlockClick)
    }

    create() {
        this.ui.initEvents(this);
    }

    onBlockClick = async (_: unknown, sprite: BlockSprite) => {
        this.input.off('gameobjectdown', this.onBlockClick)

        if (this.state.bomb === true) {
            await onBomb(this, sprite, gameConfig.bombRadius)
            this.state.bomb = false;
        } else {
            await onBlast(this, sprite, gameConfig.groupLengthToWin, gameConfig.addBombLength)
        }

        if (this.state.point >= gameConfig.pointsToWin) {
            await clearGame(this.state.getGame(), this.state)
            
            this.ui.showModalWindow('game-win')
        } else {
            setEmptyBlocks(this, gameConfig.colomns, gameConfig.rows)

            //Проверка есть ли решение
            while (StateFindSolution(this.state.getGame(), gameConfig.groupLengthToWin) === false && this.state.shuffleCount > -1) {
                this.state.shuffleUse();
                this.state.setGame = StateShuffleGame(this.state.getGame())
                BlockSpriteMoveAll(this.state.getGame());
            }

            if (this.state.steps <= 0 || this.state.shuffleCount <= -1) {
                clearGame(this.state.getGame(), this.state).then(() => {
                    this.ui.showModalWindow('game-over')
                })
            } else {
                this.input.on('gameobjectdown', this.onBlockClick)
            }
        }
    }
}