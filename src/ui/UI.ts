import gameConfig from "../gameConfig";
import { GameScene } from "../scenes/GameScene";
import State from "../state/State";

export class UI {
    readonly bombCount:HTMLElement|null
    readonly pointCount:HTMLElement|null
    readonly stepsCount:HTMLElement|null
    readonly bombBtn:HTMLElement|null

    private state:State

    constructor() {
        this.bombCount = document.getElementById('bomb-count')
        this.pointCount = document.getElementById('point-count')
        this.stepsCount = document.getElementById('steps-count')
        this.bombBtn = document.getElementById('game-bomb')
    
        this.state = State.getInstance();
        this.state.subscribe( (props:any) => {
            if ( this.bombCount !== null ) this.bombCount.innerHTML = props.bombCount
            if ( this.pointCount !== null ) this.pointCount.innerHTML = props.point+' / '+gameConfig.pointsToWin
            if ( this.stepsCount !== null ) this.stepsCount.innerHTML = props.steps
            if ( this.bombBtn !== null ) props.isBomb === true ? this.bombBtn.classList.add("on") : this.bombBtn.classList.remove("on")
        });
    }

    public showModalWindow = (nameWindow:string) => {
        console.log(nameWindow);
    }
    
    public initEvents(scene:GameScene) {
        let startBtn:HTMLElement|null = document.getElementById('start-game')
        if (startBtn !== null ) startBtn.addEventListener("click", scene.onStartGame)

        let bombBtn:HTMLElement|null = document.getElementById('game-bomb')
        if (bombBtn !== null ) bombBtn.addEventListener("click", this.state.bombUse)
    }
}