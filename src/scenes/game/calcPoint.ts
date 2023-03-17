export default (blocksLength:number):number => {
    let points:number = blocksLength;
    
    points += blocksLength > 2 ? 1 : 0
    points += blocksLength > 3 ? 1 : 0
    points += blocksLength > 4 ? 1 : 0
    points += blocksLength > 5 ? 1 : 0
    points += blocksLength > 6 ? 1 : 0
    
    return points
}