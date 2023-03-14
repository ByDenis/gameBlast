import { BlockSprite } from "./BlockSprite"

export default (obj:BlockSprite) => {
    return new Promise((resolve) => {
        obj.scene.tweens.add({
            targets: obj,
            ease: 'easeInElastic',
            scale: 0,
            duration: 400,
            onComplete:resolve
        })
    }) 
}