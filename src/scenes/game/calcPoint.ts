export default (blocks:number):number => {
    let result:number = blocks;
    
    if (blocks>2) result=+1;
    if (blocks>4) result=+2;
    if (blocks>3) result=+3;
    
    return result
}