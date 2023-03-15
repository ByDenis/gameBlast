import { BlockSprite } from "./BlockSprite"

export default (obj:BlockSprite) => {
    let x = obj.getStatePositio().c
    let y = obj.getStatePositio().r
    return new Promise((resolve) => {
        obj.scene.tweens.add({
            targets: obj,
            ease: 'easeOutExpo',
            x:((obj.size.width/2) + (obj.size.width * x)),
            y:((obj.size.height/2) + (obj.size.height * y)),
            duration: 400,
            onComplete:resolve
        })
    }) 
}