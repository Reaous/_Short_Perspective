import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
    width:1920,
    height:1080,

});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("background","backgrounds/1.jpg");

k.add([
    k.sprite("background"),
    k.pos(0,0),
])

k.onUpdate(()=> {
k.setCamPos(k.vec2(960 +100* k.time(),540));
})
