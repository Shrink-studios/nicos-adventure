namespace SpriteKind {
    export const Ui = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    if (game.ask("Go Inside?") == true) {
        tiles.setCurrentTilemap(tilemap`level0`)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 3))
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorLockedWest, function (sprite, location) {
    mySprite.setVelocity(50, 0)
    if (game.ask("Open door?") == true) {
        tiles.setCurrentTilemap(tilemap`level5`)
        tiles.placeOnRandomTile(mySprite, sprites.dungeon.doorOpenWest)
        mySprite.x += 16
    }
})
function Kill_player () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroy(mySprite3)
    Game_over = 1
    scene.cameraShake(4, 140000)
    effects.blizzard.startScreenEffect(5300)
    controller.moveSprite(mySprite, 0, 0)
    tiles.setCurrentTilemap(tilemap`level3`)
    animation.runMovementAnimation(
    mySprite,
    animation.animationPresets(animation.flyToCenter),
    200,
    false
    )
    pause(200)
    scene.centerCameraAt(mySprite.x, mySprite.y)
    music.play(music.createSoundEffect(WaveShape.Noise, 3196, 1363, 115, 78, 237, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    pause(100)
    pause(1000)
    music.play(music.createSong(hex`0078000408020202001c000c960064006d019001000478002c010000640032000000000a060005480000000400012c04000800012a08000c0001290c001000012710001400012514001800012418001c0001221c002000012020002400011e24002800011d28002c00011b2c003000011907001c00020a006400f4016400000400000000000000000000000000000000030600340038000119`), music.PlaybackMode.InBackground)
    mySprite.startEffect(effects.fire, 2000)
    sprites.destroy(mySprite, effects.disintegrate, 2000)
    pause(1000)
    color.startFade(color.originalPalette, color.Black, 2000)
    pause(2000)
    color.startFadeFromCurrent(color.originalPalette, 2000)
    textSprite = textsprite.create("Game over", 0, 2)
    textSprite2 = textsprite.create("Restart : ")
    textSprite3 = textsprite.create("your score : " + info.score())
    textSprite4 = textsprite.create("")
    textSprite.setMaxFontHeight(14)
    textSprite.setPosition(83, 35)
    textSprite2.setPosition(82, 70)
    textSprite3.setPosition(82, 94)
    textSprite4.setPosition(111, 71)
    textSprite4.setIcon(img`
        . c c c c c . 
        c 6 7 7 7 6 c 
        c 6 7 6 7 6 c 
        c 6 7 7 7 6 c 
        c 6 7 6 7 6 c 
        c 6 7 6 7 6 c 
        . c c c c c . 
        `)
    pauseUntil(() => controller.A.isPressed())
    color.startFade(color.originalPalette, color.White, 2000)
    pause(3000)
    game.reset()
}
info.onLifeZero(function () {
    Kill_player()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorLockedEast, function (sprite, location) {
    scene.cameraShake(4, 5000000)
    myEnemy = sprites.create(assets.image`myImage`, SpriteKind.Enemy)
    tiles.setCurrentTilemap(tilemap`level9`)
    myEnemy.changeScale(5, ScaleAnchor.Middle)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 6))
    tiles.placeOnTile(myEnemy, tiles.getTileLocation(10, 8))
    projectile = sprites.createProjectileFromSprite(img`
        . . . 1 . . . . . . . 1 . . . . 
        . . . 1 . . . . 1 . . 1 . . . . 
        . . . . 1 . . 1 . 1 1 . 1 . . . 
        . . . . 1 . 1 1 . 1 1 . 1 . . . 
        . . . . 1 . 1 . . 1 1 1 1 . . . 
        . . 1 1 1 1 1 1 . 1 1 . 1 1 . . 
        1 1 . 1 1 . 1 . 1 1 1 . 1 1 1 1 
        . 1 . 1 1 1 1 . . 1 1 1 1 1 1 1 
        . . 1 1 . 1 1 1 1 1 1 1 1 . 1 . 
        . . 1 1 . 1 1 1 1 1 . 1 1 1 . . 
        1 . . 1 1 . 1 . . 1 . 1 1 . . . 
        1 . 1 1 1 . 1 1 1 1 1 1 1 . . . 
        1 1 . . . 1 . 1 1 1 1 1 1 . . . 
        1 . . . . . 1 1 1 1 . 1 1 1 . . 
        . 1 1 . . 1 1 1 . . . 1 1 1 . . 
        . . . . . 1 . . . . . . . . . . 
        `, myEnemy, 50, 50)
})
let projectile: Sprite = null
let myEnemy: Sprite = null
let textSprite4: TextSprite = null
let textSprite3: TextSprite = null
let textSprite2: TextSprite = null
let textSprite: TextSprite = null
let Game_over = 0
let mySprite: Sprite = null
let mySprite3: Sprite = null
music.play(music.createSong(assets.song`start menu`), music.PlaybackMode.LoopingInBackground)
let mySprite2 = sprites.create(img`
    . . . . . . . . . . . . . . 
    . . . . . 2 2 2 1 1 . . . . 
    . . . . 2 2 2 2 1 1 . . . . 
    . . . . 2 2 2 1 1 1 . . . . 
    . . . . 2 2 2 2 . . . . . . 
    . . . 2 2 2 2 2 . . . . . . 
    . 2 2 2 2 2 2 2 2 . . . . . 
    . 2 2 2 2 2 2 2 2 . . . . . 
    2 2 2 2 2 2 2 2 2 2 . . . . 
    2 2 2 2 2 2 2 2 2 2 . . . . 
    f b 3 d d d d 3 b f . . . . 
    e d d d d d d d d e . . . . 
    e d f d d d d f d e . b f b 
    f d d f d d f d d f . f d f 
    f b d d b b d d 2 f . f d f 
    . f 2 2 2 2 2 2 b b f f d f 
    . f b d d d d d d b b d b f 
    . f d d d d d b d d f f f . 
    . f d f f f d f f d f . . . 
    . f f . . f f . . f f . . . 
    `, SpriteKind.Ui)
let textSprite6 = textsprite.create("Nicos adventure")
let textSprite7 = textsprite.create("Play")
let textSprite8 = textsprite.create("Credits")
textSprite7.setPosition(38, 67)
mySprite2.setScale(7, ScaleAnchor.Middle)
mySprite2.setPosition(132, 77)
textSprite6.setMaxFontHeight(6)
textSprite6.setOutline(1, 15)
textSprite6.setPosition(58, 23)
let textSprite9 = textsprite.create("")
textSprite9.setIcon(assets.image`myImage2`)
textSprite9.setPosition(59, 68)
textSprite8.setPosition(21, 114)
let textSprite10 = textsprite.create("")
textSprite10.setIcon(img`
    . f f f f f . 
    f 8 9 9 9 8 f 
    f 8 9 8 9 8 f 
    f 8 9 9 9 8 f 
    f 8 9 8 9 8 f 
    f 8 9 9 9 8 f 
    . f f f f f . 
    `)
textSprite10.setPosition(49, 115)
animation.runMovementAnimation(
textSprite9,
animation.animationPresets(animation.bobbing),
2000,
true
)
animation.runMovementAnimation(
textSprite7,
animation.animationPresets(animation.bobbing),
2000,
true
)
scene.setBackgroundImage(assets.image`myImage1`)
pauseUntil(() => controller.A.isPressed() || controller.B.isPressed())
if (controller.B.isPressed()) {
    color.startFade(color.originalPalette, color.Black)
    music.stopAllSounds()
    sprites.destroy(mySprite2)
    sprites.destroy(textSprite10)
    sprites.destroy(textSprite7)
    sprites.destroy(textSprite8)
    sprites.destroy(textSprite9)
    sprites.destroy(textSprite6)
    pause(2000)
    color.startFade(color.Black, color.originalPalette)
    textSprite10 = textsprite.create("Made By MARCOS DOMINGEUZ")
    textSprite9 = textsprite.create("Special thanks to")
    textSprite8 = textsprite.create("Dylan Acosta")
    textSprite10.setOutline(1, 15)
    textSprite9.setOutline(1, 15)
    textSprite8.setOutline(1, 15)
    textSprite10.setPosition(81, 26)
    textSprite9.setPosition(81, 57)
    textSprite8.setPosition(81, 68)
    pauseUntil(() => controller.A.isPressed())
    sprites.destroy(textSprite8)
    sprites.destroy(textSprite9)
    sprites.destroy(textSprite10)
} else {
    if (controller.A.isPressed()) {
        music.stopAllSounds()
        sprites.destroy(mySprite2)
        sprites.destroy(textSprite10)
        sprites.destroy(textSprite7)
        sprites.destroy(textSprite8)
        sprites.destroy(textSprite9)
        sprites.destroy(textSprite6)
    }
}
tiles.setCurrentTilemap(tilemap`level`)
let textSprite5 = textsprite.create("NICO", 0, 6)
textSprite5.setMaxFontHeight(6)
textSprite5.setOutline(1, 15)
let myMinimap = minimap.minimap()
mySprite3 = sprites.create(minimap.getImage(minimap.minimap(MinimapScale.Eighth, 2, 15)), SpriteKind.Player)
mySprite = sprites.create(img`
    e e e . . . . e e e . . . . 
    c d d c . . c d d c . . . . 
    c b d d f f d d b c . . . . 
    c 3 b d d b d b 3 c . . . . 
    f b 3 d d d d 3 b f . . . . 
    e d d d d d d d d e . . . . 
    e d f d d d d f d e . b f b 
    f d d f d d f d d f . f d f 
    f b d d b b d d 2 f . f d f 
    . f 2 2 2 2 2 2 b b f f d f 
    . f b d d d d d d b b d b f 
    . f d d d d d b d d f f f . 
    . f d f f f d f f d f . . . 
    . f f . . f f . . f f . . . 
    `, SpriteKind.Player)
mySprite3.setFlag(SpriteFlag.RelativeToCamera, true)
scene.cameraFollowSprite(mySprite)
mySprite.setPosition(72, 95)
mySprite3.setPosition(141, 101)
controller.moveSprite(mySprite, 100, 100)
info.setScore(0)
info.setLife(9)
color.startFade(color.White, color.originalPalette, 1000)
forever(function () {
	
})
forever(function () {
	
})
forever(function () {
    textSprite5.setPosition(mySprite.x + 0, mySprite.y + -15)
})
game.onUpdateInterval(500, function () {
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.Double)
})
