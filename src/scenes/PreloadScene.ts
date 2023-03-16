import { Scene } from 'phaser'

import gameConfig from '../gameConfig'
import tile1 from '../assets/img/yellow.png'
import tile2 from '../assets/img/red.png'
import tile3 from '../assets/img/purple.png'
import tile4 from '../assets/img/green.png'
import tile5 from '../assets/img/blue.png'

const allTile = [tile1, tile2, tile3, tile4, tile5]

export class PreloadScene extends Scene {
    constructor() {
        super('PreloadScene')
    }

    preload() {
        for (let indexTile in gameConfig.arrGameBlockType) {
            this.load.image('tile' + gameConfig.arrGameBlockType[indexTile], allTile[indexTile])
        }

    }

    create() {
        this.scene.start('GameScene')
    }
}