import gameConfig from "../gameConfig";
import { GameScene } from "../scenes/GameScene";
import State from "../state/State";

export class UI {
    readonly displayGame:HTMLElement|null
    readonly bombCount:HTMLElement|null
    readonly pointCount:HTMLElement|null
    readonly stepsCount:HTMLElement|null
    readonly bombBtn:HTMLElement|null
    readonly progressBar:HTMLElement|null

    private state:State

    constructor() {
        this.displayGame = document.getElementById('display-game')
        this.bombCount = document.getElementById('bomb-count')
        this.pointCount = document.getElementById('point-count')
        this.stepsCount = document.getElementById('steps-count')
        this.bombBtn = document.getElementById('game-bomb')
        this.progressBar = document.getElementById('progress-data')
    
        this.state = State.getInstance();
        this.state.subscribe( (props:any) => {
            if ( this.bombCount !== null ) this.bombCount.innerHTML = props.bombCount
            if ( this.pointCount !== null ) this.pointCount.innerHTML = props.point+' / '+gameConfig.pointsToWin
            if ( this.stepsCount !== null ) this.stepsCount.innerHTML = props.steps
            if ( this.bombBtn !== null ) props.isBomb === true ? this.bombBtn.classList.add("on") : this.bombBtn.classList.remove("on")
            
            let progressPercent = parseInt(props.point)/gameConfig.pointsToWin * 100
            if ( this.progressBar !== null ) this.progressBar.style.setProperty("width", `calc(${progressPercent}% - 4px)`)
        
            if ( this.displayGame !== null ) this.displayGame.style.display = 'flex';
        });
    }

    public showModalWindow = (nameWindow:string) => {
        let showBlock:HTMLElement|null = document.getElementById(nameWindow)
        if (showBlock !== null ) showBlock.classList.add("on")
    }

    public hideModalWindow = () => {
        let listModalWindow:HTMLCollection|null = document.getElementsByClassName('modal')
        let arrModalWindow:Element[] = Array.from(listModalWindow)
            arrModalWindow.forEach((element:Element) => {
                element.classList.remove('on')
            });
    }
    
    public initEvents(scene:GameScene) {
        let startBtns:HTMLCollection|null = document.getElementsByClassName('start-game')
        let arrStartBtns:Element[] = Array.from(startBtns)
            arrStartBtns.forEach((element:Element) => {
                element.addEventListener("click", scene.onStartGame );
            });

        let bombBtn:HTMLElement|null = document.getElementById('game-bomb')
        if (bombBtn !== null ) bombBtn.addEventListener("click", this.state.bombUse)
    }
}