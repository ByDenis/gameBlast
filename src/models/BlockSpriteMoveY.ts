import { BlockSprite } from "./BlockSprite"

export default (obj:BlockSprite) => {
    let y = obj.getStatePositio().r
    return new Promise((resolve) => {
        obj.scene.tweens.add({
            targets: obj,
            ease: 'easeOutExpo',
            y:((obj.size.height/2) + (obj.size.height * y)),
            duration: 400,
            onComplete:resolve
        })
    }) 
}