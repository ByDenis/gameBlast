import { Utils } from "phaser"
import { BlockSprite } from "../models/BlockSprite"

export default (game:any, ):BlockSprite[][] => {
    let ret:BlockSprite[][] = []

    for (let c=0; c<game.length; c++) {
        ret.push(Utils.Array.Shuffle(game[c]));
    }

    for (let c=0; c<ret.length; c++) {
        for (let r=0; r<ret[c].length; r++) {
            ret[c][r].setStatePosition(c,r);
        }
    }

    return ret;
}