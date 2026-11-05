import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
    width:1920,
    height:1080,

});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("background","backgrounds/b2.jpg");
k.loadSprite("mc","sprites/mc.png")

const speed = 400


k.scene("start",() => {

    k.setBackground(rgb(20,20,20))


    k.add([
        k.text("You open your eyes in a room where you dont belong.\n Try not to be spotted\n\n\n\nPress enter to start.",{size:30}),
        k.pos(100,100)
    ])

    k.onKeyPress("enter",()=> {
        k.go("table")
    })

}
)

k.scene("table", ()=> {

k.setGravity(800)

const bg =k.add([
    k.sprite("background"),
    k.pos(0,0),
])

k.tween(0,1,0.5,(p)=>bg.opacity =p )

const player =k.add([
    k.sprite("mc"),
    k.pos(3000,3800),
    k.scale(2),
    k.stay(),
    k.area(500,500),
    k.body(),
    "player"
])

k.add([
    k.rect(8000,2000),
    k.pos(1000,4000),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0),
    k.z(10),
])

//playah controls 

k.onKeyDown("d",()=> {
    player.move(speed,0)
})
k.onKeyDown("a", () => {
    player.move(-speed,0)
})

k.onKeyPress("space",()=> {
    if (player.isGrounded()) {
    player.jump();
    }
})
//playah controls ends here , :stop-sign-holding-cat-emoji:


k.add([
    k.circle(50),
    k.pos(3000,3800),
    k.z(0),
    "interaction"
])




function explore() {
    i = k.get("interactiontext")
    o = k.get ("interaction")
    i.opacity = 1
    o.scale = 100
}

k.onUpdate(()=> {
    if (player.isColliding ("interaction") ){
        explore()
    }
})

let x,y,z;

player.onUpdate(()=> {
    x =k.getCamPos();
    y =player.pos;
    z=k.lerp(x,y,0.1)
    k.setCamPos(z)
    k.setCamScale(0.4)
});
})
k.go("start");