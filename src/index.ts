import { Game, Types, AUTO } from 'phaser'
import { PreloadScene } from './scenes/PreloadScene'
import { GameScene } from './scenes/GameScene'
import gameConfig from './gameConfig'
import CalcScaleBlock from './utils/calcScaleBlock'
import State from './state/State'

try {
	const state = State.getInstance()
	//Определяем размер тайла
	state.scale = CalcScaleBlock(gameConfig.screenWidth, gameConfig.tileWidth, gameConfig.colomns)
	//Подгоняем высоту canvas
	const screenHeight = gameConfig.tileHeight * state.scale * gameConfig.rows

	const config: Types.Core.GameConfig = {
		type: AUTO,
		width: gameConfig.screenWidth,
		height: screenHeight,
		transparent: true,
		parent: gameConfig.parentId,
		scene: [
			PreloadScene,
			GameScene
		]
	}

	new Game(config)

} catch (e) {
	console.error(e)
}