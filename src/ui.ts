import gameConfig from "./gameConfig";
import State from "./state/State";

export default () => {
    const state = State.getInstance();
    state.subscribe( (props:any) => {
        
        let bombCount:HTMLElement|null = document.getElementById('bomb-count')
        if ( bombCount !== null ) bombCount.innerHTML = props.bombCount

        let pointCount:HTMLElement|null = document.getElementById('point-count')
        if ( pointCount !== null ) pointCount.innerHTML = props.point+' / '+gameConfig.pointsToWin

        let stepsCount:HTMLElement|null = document.getElementById('steps-count')
        if ( stepsCount !== null ) stepsCount.innerHTML = props.steps


        let bombBtn:HTMLElement|null = document.getElementById('game-bomb')
        if ( bombBtn !== null ) props.isBomb === true ? bombBtn.classList.add("on") : bombBtn.classList.remove("on");

    });
}