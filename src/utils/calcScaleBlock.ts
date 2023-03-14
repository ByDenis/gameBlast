
export default (widthScreen:number, widthSprite:number, countSprite:number):number => {
    let scale = widthScreen / (widthSprite * countSprite)
    return scale
}