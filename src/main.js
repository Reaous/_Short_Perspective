import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay({
    width:1920,
    height:1080,

});

k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("background","backgrounds/b2.jpg");
k.loadSprite("mc","sprites/mc.png")
k.loadSprite("lapy","sprites/lapy2.jpg")
//k.loadSprite("phone","sprites/phone.jpg")


k.loadSound("click","audio/click.mp3")

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

const dialogue = { "lapy":{line:"A old laptop ... ",audio:"music"}, 
                    "phone":{line:"A phone ;D, unfortunatly dead..."},audio:"none"}

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
    k.area(),
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
    k.pos(3500,3800),
    k.z(0),
    k.scale(),
    k.area(),
    k.color('blue'),

    "interaction",
    {
        s : "lapy",
    }
])

k.add([
    k.circle(50),
    k.pos(5000,3800),
        k.z(0),
    k.scale(),
    k.area(),
    k.color('blue'),

    "interaction",
    {
        s : "phone",
    }
])



player.onCollide("interaction" ,(interactable) => {
    interactable.scaleTo(1.5);
})

let ifinteraction = false;
let image ; 
let text ;
let textbox;
let nowinteract;

k.onClick("interaction", (interactable) => {
    ifinteraction = true;
    k.play("click")
    k.wait(0.4,()=> {
        image = k.add([
            k.sprite(interactable.s),
            "i-view",
            k.fixed(),
            k.pos(),
            k.scale(0.8)
        ])

    nowinteract = dialogue[interactable.s]


    const dialoguescreen = k.add([
        k.text(nowinteract.line,{size:30}),
        k.pos(500,800),
        k.z(3),
        k.fixed()


    ])

    const dialoguebox =dialoguescreen.add([
        k.rect(dialoguescreen.width+40,dialoguescreen.height+40),
        k.z(.3),
        k.color("black")
    ])


        k.tween(0,1,1,(opa) => {image.opacity = opa ,text.opacity = opa ,textbox.opacity = opa} )
    text = k.add([
        k.text("Go back to scene by pressing b ",{size:32}),
        k.fixed(),
        k.pos(100,100),
        "i-view",
        k.z(2)
    
    ])
    textbox= text.add([
        k.rect(text.width+10,text.height+10),
        k.color(rgb(0, 0, 0)),
        k.z(0),
        "i-view"
        ])
    })
})

    k.onKeyPress("b",() =>{
        if (ifinteraction ===true){
        k.tween(1,0,0.4,(opa) => (image.opacity= opa, text.opacity = opa,textbox.opacity = opa ))
        ifinteraction= false;
        k.wait(1,()=> {
        k.destroyAll("i-view")

        })
    }})



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