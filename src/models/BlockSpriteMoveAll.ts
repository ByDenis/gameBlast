import { GameData } from "../state/State"
import { BlockSprite } from "./BlockSprite";
import BlockSpriteMove from "./BlockSpriteMove"

export default (game:any) => {
    for (let c=0; c<game.length; c++) {
        for (let r=0; r<game[c].length; r++) {
            let tmp:BlockSprite = game[c][r];
            BlockSpriteMove(tmp);
        }
    }
}