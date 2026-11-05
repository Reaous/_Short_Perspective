import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
    width:1920,
    height:1080,

});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("background","backgrounds/1.jpg");
k.loadSprite("mc","sprites/mc.png")

const speed = 300

k.scene("table", ()=> {

k.add([
    k.sprite("background"),
    k.pos(0,0),
])



const player =k.add([
    k.sprite("mc"),
    k.pos(500,500),
    k.scale(2),
    k.stay(),
    "player"
])


k.onKeyDown("d",()=> {
    player.move(speed,0)
})
k.onKeyDown("a", () => {
    player.move(-speed,0)
})


k.add([
    k.circle(50),
    k.pos(3000,500),
    k.z(10)
])


player.onUpdate(()=> {
k.setCamPos(player.worldPos);
})
k.setCamScale(0.2)
});

k.go("table")