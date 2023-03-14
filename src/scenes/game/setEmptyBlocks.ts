import { GameData } from "../../state/State"
import { GameScene } from "../GameScene"

export default (scene:GameScene, colomns:number, rows:number) => {
    let game:GameData = scene.state.getGame()
    for (let c=0; c<colomns; c++) {
        for (let r=0; r<rows; r++) {
            if (game[c][r] === null) scene.state.saveBlock( scene.createrBlock.getNext(scene, c, r) )
        }
    }
}