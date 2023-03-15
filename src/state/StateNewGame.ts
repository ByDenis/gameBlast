import State from "./State";

export default (state:State, gameConfig:any):void => {
    state.bombCount = gameConfig.bombStartValue;
    state.shuffleCount = gameConfig.shuffleCount;
    state.steps = gameConfig.stepsToWin;
    state.point = 0;
    state.subscribe();
}