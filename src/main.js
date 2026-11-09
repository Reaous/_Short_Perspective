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
k.loadSprite("ground","backgrounds/ground1.jpg")
k.loadSprite("text","sprites/cat.png")
k.loadSprite("h1","backgrounds/hidespot.jpg"),
k.loadSprite("h2","backgrounds/hidespotn.jpg"),
k.loadSprite("h3","backgrounds/hidespotf.jpg")
k.loadSprite("catyay","sprites/catyay.jpg")

k.loadSound("click","audio/click.mp3")
k.loadSound("impact","audio/impact.mp3")
k.loadSound("slide","audio/slide.mp3")
k.loadSound("yay","audio/yay.mp3")

const speed = 600


k.scene("start",() => {

    k.setBackground(rgb(20,20,20))


    k.add([
        k.text("You open your eyes in a room where you dont belong.\n Try not to be spotted\n go find a hiding spot before the timer ends \n\n\n\nPress enter to start.",{size:30}),
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
    k.opacity(0),
    "firsts"
])

const jump = k.add ([
    k.rect(10,13000),
    k.pos(7000,0),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0),
    "firsts",
    "jump"
])
//end of collisions

//playah controls 

let playerstop = false;

    k.onKeyDown("d",()=> {
        if (playerstop === false){
        player.move(speed,0)}
    })
    k.onKeyDown("a", () => {
        if (playerstop === false){
        player.move(-speed,0)}
    })

    k.onKeyPress("space",()=> {
        if (player.isGrounded()) {
        if (playerstop === false ){
        player.jump();
        }
        }
    })

//playah controls ends here , :stop-sign-holding-cat-emoji:

// interactables for my table//
k.add([
    k.circle(80),
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
    k.circle(80),
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

let wannajump = false;
let havecollide1 = false;
k.onCollide("player","jump",()=> {
    if (havecollide1=== false ){
        havecollide1 = true;
        const text = k.add([
            k.text("wanna jump ? \n (press enter)",{size:64}),
            k.pos(player.pos.x,player.pos.y - 400 ), 
            k.z(2),
            "textjump"
        ])
        text.add ([
            k.rect(text.width+30,text.height+30),
            k.color(k.rgb(30,30,39)),
            k.z(0.3),
            "textjump"
        ])
        playerstop= true;
        wannajump=true;
    }
})

        k.onKeyPress("enter",()=> {
        if (wannajump===true){
            k.go("down")
            }
        })

        k.onKeyPress( (key)=> {
        if (wannajump == true){
            if (key !== "enter"){
                playerstop= false;
            }
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


k.scene("down", ()=> {

k.setBackground("black")
k.setGravity(200)
k.wait(0.2, ()=> {
k.play("slide",{speed:1.2});})

const background =k.add ([
    k.sprite("ground"),
    k.pos(1,1),
    k.z(0),
])
k.tween(0,1,0.5, (opa)=> background.opacity= opa,k.easings.easeoutbounce)




//playah and playsh's controls'//
const player =k.add ([
    k.sprite("mc","sprites/mc.png"),
    k.pos(500,150),
    k.area(),
    k.body(),
    "player",
    k.scale(0.5),
    k.z(10),
])

k.onKeyDown ("a",()=> {
    player.move(-150,0)
})
k.onKeyDown("d",()=> {
    player.move(150,0)
})

let impact = 0 ;
    player.onCollide ("ground" , () => {
    if (impact === 0){
        k.play("impact")
        impact ++
    }
})
//de end

//collision(am i in hell)

k.add([
k.rect(1000,500),
k.pos(0,500),
k.area(),
k.body({isStatic:true}),
k.opacity(0),
k.z(1),
"ground"
])

k.add([
    k.rect(10,4000),
    k.pos(400,0),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0),
])

k.add([
k.rect(1170,500),
k.pos(0,570),
k.area(),
k.body({isStatic:true}),
k.opacity(0),
k.z(1)
])

k.add([
k.rect(1989,10),
k.pos(0,800),
k.area(),
k.body({isStatic:true}),
k.opacity(0),
k.z(1)
])

const shift = k.add([
    k.rect(10,1040),
    k.pos(1450,0),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0),
    "shift"

])

//collision end(yay yippe )

//fancy fancy interactable functions//

k.onHover("interaction",(interaction) => {
    k.tween(1,1.3,0.2,(scale) => interaction.scale = k.vec2(scale,scale) ,k.easings.easeoutcubic)
})

k.onHoverEnd("interaction",(interaction) => {
    k.tween(1.3,1,0.2,(scale) => interaction.scale = k.vec2(scale,scale) ,k.easings.easeoutcubic)
})

const dialogue = {"text": {line: "It seems like a hideout spot is in front of you ! "}}

let ifinteraction = false;
let image ; 
let text ;
let textbox;
let dialoguescreen;
let dialoguebox;
let nowinteract;

k.onClick("interaction", (interactable) => {
    ifinteraction = true;
    k.wait(0,()=> {
        image = k.add([
            k.sprite(interactable.s),
            "i-view",
            k.fixed(),
            k.pos(),
            k.scale(0.1),
            k.opacity(0),
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


        k.tween(0,1,1,(opa) => {text.opacity = opa ,textbox.opacity = opa} )
    text = k.add([
        k.text("Go fast ! ",{size:32}),
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
        k.tween(1,0,0.4,(opa) => ( text.opacity = opa,textbox.opacity = opa  ))
        ifinteraction= false;
        k.wait(1,()=> {
        k.destroyAll("i-view")

        })
    }})

//end of fancy fancy interactable functions//


k.add([
    k.circle(20),
    k.pos(1000,400),
    k.color("blue"),
    "interaction",
    k.area(),
    k.scale(),
    {
        s : "text"
    }
])

player.onCollide("shift", ()=> {
    k.go("hideout")

})


})

k.scene("hideout", ()=> {
    k.setBackground("black");

    const player = k.add([
        k.sprite("mc"),
        k.scale(1),
        k.pos(150,600),
        k.area(),
        k.body(),
        "player",
        k.z(10)
    ])


let speed = 160;
    k.onKeyDown("a",()=> {
        player.move(-speed,0)
    })

        k.onKeyDown("d",()=> {
        player.move(speed,0)
    })

        k.onKeyDown("w",()=> {
        player.move(0,-speed)
    })

        k.onKeyDown("s",()=> {
        player.move(0,speed)
    })



    const h1 = k.add([
        k.sprite("h1"),
        k.pos(),
        k.opacity(1),
        k.scale(0.8),
        k.z(0)
    ])

    const h2 = k.add([
        k.sprite("h2"),
        k.pos(),
        k.opacity(0),
        k.scale(0.8),
        k.z(0.2)
    ])

    const h3 = k.add([
        k.sprite("h3"),
        k.pos(),
        k.opacity(0),
        k.scale(0.8),
        k.z(0.6)
    ])


//collisions (ahhhhh why someone save me )

k.add([
    k.rect(300,1060),
    k.pos(1100,0),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0)
])

k.add([
    k.rect(1980,10),
    k.area(),
    k.pos(0,870),
    k.body({isStatic:true}),
    k.opacity(0),
])

k.add([
    k.rect(10,800),
    k.rotate(-140),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0),
    k.pos(0,870)

])

k.add([
    k.rect(1000,10),
    k.area(),
    k.body({isStatic:true}),
    k.opacity(0),
    k.pos(0,340),
    k.rotate(1),
]);

const hide = k.add([
    k.circle(40),
    k.pos(370,400),
    k.area(),
    k.body({isStatic:true}),
    k.color("blue"),
    k.z(3),
    k.scale(1),
    "hide",
    "c1"
])

const hole = k.add([
    k.circle(40),
    k.pos(990,400),
    k.area(),
    k.color("blue"),
    k.body({isStatic:true}),
    k.z(3),
    k.scale(1),
    "hole",
    "c2"
])


k.onHover("hole",()=> {
    hole.scaleTo (1.32)
        const text2 = k.add ([
        k.text("press f to hide with wooden plank ", {size : 34}),
        k.pos(hole.pos.x -300,hole.pos.y-90),
        k.z(3),
        "view2"
    ])

    text2.add([
        k.rect(text2.width +30,text2.height +30),
        k.z(1),
        k.color("black"),
        "view2"
    ])
})

k.onHoverEnd("hole", ()=> {
    hole.scaleTo (1)
    k.wait(1, ()=> {
     k.destroyAll("view2")

})
})


k.onHover("hide", ()=> {
        const text = k.add ([
        k.text("press enter to take wooden plank", {size : 34}),
        k.pos(hide.pos.x -300,hide.pos.y-90),
        k.z(3),
        "view1"
    ])

    text.add([
        k.rect(text.width +30,text.height +30),
        k.z(1),
        k.color("black"),
        "view1"
    ])
    hide.scaleTo (1.32)
})

k.onHoverEnd("hide",()=> {
    hide.scaleTo (1)
    k.wait(1, ()=> {
         k.destroyAll("view1")
    })

})

let enter =1 ;
let f =0 ;
k.onKeyPress("enter", ()=>{
    if (enter==1){
        k.shake(1.4);
        k.tween(0,1,1,opa => h2.opacity = opa );
        enter++;
        f ++;
        k.destroyAll("c1")

    }})

const caty =k.add([
    k.sprite("catyay"),
    k.scale(0.5),
    k.pos(40,60),
    k.opacity(0),
    k.z(4),
])

k.onKeyPress("f", ()=> {
    if (f===1){
        k.shake(4)
        k.tween(0,1,1,opa => h3.opacity = opa );
        k.tween(0,1,1,opa => caty.opacity = opa );
        k.play("yay")
        f++;
        k.destroyAll("c2")
    }
})



})

k.go("hideout");