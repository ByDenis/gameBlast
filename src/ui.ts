import gameConfig from "./gameConfig";
import State from "./state/State";

export default () => {
    
    const bombCount:HTMLElement|null = document.getElementById('bomb-count')
    const pointCount:HTMLElement|null = document.getElementById('point-count')
    const stepsCount:HTMLElement|null = document.getElementById('steps-count')
    const bombBtn:HTMLElement|null = document.getElementById('game-bomb')

    const state = State.getInstance();
    state.subscribe( (props:any) => {
        if ( bombCount !== null ) bombCount.innerHTML = props.bombCount
        if ( pointCount !== null ) pointCount.innerHTML = props.point+' / '+gameConfig.pointsToWin
        if ( stepsCount !== null ) stepsCount.innerHTML = props.steps
        if ( bombBtn !== null ) props.isBomb === true ? bombBtn.classList.add("on") : bombBtn.classList.remove("on")
    });
}