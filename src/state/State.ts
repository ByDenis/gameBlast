import { BlockSprite, StatePositionBlock } from '../models/BlockSprite'

export type GameData = BlockSprite[][]|null[][]

export default class State {
    private static _instance: State
    private constructor() {}

    public static getInstance(): State {
        if (!State._instance) {
            State._instance = new State()
        }
        return State._instance;
    }
    
    private _scale: number = 1;
    get scale(): number { return this._scale }
    set scale(scale:number) { this._scale = scale }

    private _steps: number = 0;
    get steps(): number { return this._steps}
    set steps(value:number) { this._steps = value }
    public stepAdd = ():void => { this._steps++ }

    private _point: number = 0;
    get point(): number { return this._point}
    set point(value:number) { this._point = value }
    public pointAdd = (value:number):number => { this._point + value; return this._point; }

    private _isBomb: boolean = false;
    get bomb(): boolean { return this._isBomb }
    set bomb(flag:boolean) { this._isBomb = flag }

    private _BombCount: number = 0;
    set bombCount(count:number) { this._BombCount = count }
    get bombCount(): number { return this._BombCount }
    public bombPlus = ():void => {this._BombCount++}
    public bombMinus = ():void => {this._BombCount--}

    private _game:GameData

    public getGame = ():GameData => {
        return this._game
    }
    public initGame = (colomns:number, rows:number):void => {
        this._game = new Array(colomns)
        for (let c=0; c<colomns; c++) {
            this._game[c] = new Array(rows)
        }
    }
    public saveBlock = (sprite:BlockSprite):void => {
        const position = sprite.getStatePositio();
        this._game[position.c][position.r] = sprite
    }
    public clearBlock = (position:StatePositionBlock):void => {
        this._game[position.c][position.r] = null;
    }
}