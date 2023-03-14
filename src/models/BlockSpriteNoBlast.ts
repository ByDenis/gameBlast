import { BlockSprite } from "./BlockSprite"

export default (obj:BlockSprite) => {
    let angel = 30;
    let time = 200;
    return new Promise((resolve) => {
        obj.scene.tweens.add({
            targets: obj,
            ease: 'easeOutElastic',
            angle:angel,
            duration: time,
            onComplete:() => {
                obj.scene.tweens.add({
                    targets: obj,
                    ease: 'easeOutElastic',
                    angle:-angel,
                    duration: time,
                    onComplete:() => {
                        obj.scene.tweens.add({
                            targets: obj,
                            ease: 'easeInElastic',
                            angle:0,
                            duration: time,
                            onComplete:resolve
                        })
                    }
                })
            }
        })
    }) 
}