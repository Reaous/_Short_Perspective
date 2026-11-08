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
k.loadSprite("phone","sprites/phone2.jpg")


k.loadSound("click","audio/click.mp3")

const speed = 600


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
                    "phone":{line:"A phone :D, unfortunatly dead..."},audio:"none"}

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

//collisons (i hate making them)//
k.add([
    k.rect(8000,2000),
    k.pos(1000,4000),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0),
    k.z(10),
    "firsts"
])

k.add([
    k.rect(10,13000),
    k.pos(2500,0),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0.3),
    "firsts"
])

const jump = k.add ([
    k.rect(10,13000),
    k.pos(7000,0),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0.3),
    "firsts",
    "jump"
])
//end of collisions

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

// interactables for my table//
k.add([
    k.circle(50),
    k.pos(3200,3600),
    k.z(0),
    k.scale(),
    k.area(),
    k.color('blue'),
    "firsts",
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
    "firsts",
    "interaction",
    {
        s : "phone",
    }
])

//end of interactables for my tbales//


//fancy fancy interactable functions//

k.onHover("interaction",(interaction) => {
    k.tween(1,1.3,0.2,(scale) => interaction.scale = k.vec2(scale,scale) ,k.easings.easeoutcubic)
})

k.onHoverEnd("interaction",(interaction) => {
    k.tween(1.3,1,0.2,(scale) => interaction.scale = k.vec2(scale,scale) ,k.easings.easeoutcubic)
})

player.onCollide("interaction" ,(interactable) => {
    interactable.scaleTo(1.5);
})

let ifinteraction = false;
let image ; 
let text ;
let textbox;
let dialoguescreen;
let dialoguebox;
let nowinteract;

k.onClick("interaction", (interactable) => {
    ifinteraction = true;
    k.play("click")
    k.wait(0.2,()=> {
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
        k.pos(500,600),
        k.z(3),
        k.fixed(),
        "i-view"

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
        k.tween(1,0,0.4,(opa) => (image.opacity= opa, text.opacity = opa,textbox.opacity = opa  ))
        ifinteraction= false;
        k.wait(1,()=> {
        k.destroyAll("i-view")

        })
    }})

//end of fancy fancy interactable functions//


let havecollide1 = false;
k.onCollide("player","jump",()=> {
    if (havecollide1=== false ){
        havecollide1 = true;
        const text = k.add([
            k.text("wanna jump ? \n (press enter)",{size:64}),
            k.pos(player.pos.x,player.pos.y - 500 ), 
            k.z(2)
        ])
        text.add ([
            k.rect(text.width+30,text.height+30),
            k.color(rgb(30,30,39)),
            k.z(0.3)
        ])
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