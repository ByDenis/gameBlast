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

    private _shuffleCount: number = 0;
    get shuffleCount(): number { return this._shuffleCount }
    set shuffleCount(value:number) { this._shuffleCount = value }
    public shuffleUse = ():void => { this._shuffleCount-- }

    private _steps: number = 0;
    get steps(): number { return this._steps }
    set steps(value:number) { this._steps = value; this._subscribe() }
    public stepAdd = ():void => { this._steps--; this._subscribe() }

    private _point: number = 0;
    get point(): number { return this._point}
    set point(value:number) { this._point = value; this._subscribe()}
    public pointAdd = (value:number):number => { this._point += value; this._subscribe(); return this._point; }

    private _isBomb: boolean = false;
    get bomb(): boolean { return this._isBomb }
    set bomb(flag:boolean) { this._isBomb = flag; this._subscribe() }
    public bombUse = ():void => {
        if(this._isBomb === true) {
            this._isBomb = false 
        } else {
            this._isBomb = this.bombCount > 0 ? true : false 
        }
        this._subscribe();
    }

    private _BombCount: number = 0;
    set bombCount(count:number) { this._BombCount = count; this._subscribe() }
    get bombCount(): number { return this._BombCount }
    public bombPlus = ():void => {this._BombCount++; this._subscribe()}
    public bombMinus = ():void => {this._BombCount--; this._subscribe()}

    private _game:GameData;

    set setGame(game:GameData) { this._game = game }
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
    public getBlock = (position:StatePositionBlock):BlockSprite|null => {
        return this._game[position.c][position.r];
    }

    private _subscribeFunc:Function = () => {};
    private _subscribe:Function = () => {
        this._subscribeFunc({
            steps: this._steps,
            point: this._point,
            bombCount: this._BombCount,
            isBomb: this._isBomb
        }); 
    };
    public subscribe = (func:Function|null = null) => {
        if (func === null) {
            this._subscribe();
        } else {
            this._subscribeFunc = func;
            this._subscribe();
        }
    } 
}