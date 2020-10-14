export class CardRepository {

  get count(): number{
     return this.cards.length;
  }

  getCard(index: number) {
     return this.cards[index];
  }

  private cards = [
    {
       "point1":"elephant",
       "point3":"elephant ear"
    },
    {
       "point1":"bowling",
       "point3":"bowling shirt"
    },
    {
       "point1":"ladder",
       "point3":"rope ladder"
    },
    {
       "point1":"potato",
       "point3":"mashed potato"
    },
    {
       "point1":"grass",
       "point3":"grass skirt"
    },
    {
       "point1":"boot",
       "point3":"rain boot"
    },
    {
       "point1":"fossil",
       "point3":"fossil fuel"
    },
    {
       "point1":"summer",
       "point3":"summer vacation"
    },
    {
       "point1":"queen",
       "point3":"queen bee"
    },
    {
       "point1":"dry",
       "point3":"dry ice"
    },
    {
       "point1":"battle",
       "point3":"battlefield"
    },
    {
       "point1":"fact",
       "point3":"fact finder"
    },
    {
       "point1":"calendar",
       "point3":"lunar calendar"
    },
    {
       "point1":"garage",
       "point3":"garage band"
    },
    {
       "point1":"banana",
       "point3":"banana split"
    },
    {
       "point1":"driver",
       "point3":"backseat driver"
    },
    {
       "point1":"candle",
       "point3":"candle wax"
    },
    {
       "point1":"hand",
       "point3":"handshake"
    },
    {
       "point1":"popcorn",
       "point3":"microwave popcorn"
    },
    {
       "point1":"stool",
       "point3":"stool pigeon"
    },
    {
       "point1":"bone",
       "point3":"funny bone"
    },
    {
       "point1":"globe",
       "point3":"snow globe"
    },
    {
       "point1":"popsicle",
       "point3":"popsicle stick"
    },
    {
       "point1":"sugar",
       "point3":"brown sugar"
    },
    {
       "point1":"bite",
       "point3":"spider bite"
    },
    {
       "point1":"water",
       "point3":"white water rafting"
    },
    {
       "point1":"monkey",
       "point3":"monkey business"
    },
    {
       "point1":"glass",
       "point3":"champagne glass"
    },
    {
       "point1":"radio",
       "point3":"radioactive"
    },
    {
       "point1":"foot",
       "point3":"big foot"
    },
    {
       "point1":"balloon",
       "point3":"water ballon fight"
    },
    {
       "point1":"farm",
       "point3":"dairy farm"
    },
    {
       "point1":"castle",
       "point3":"sand castle"
    },
    {
       "point1":"stop",
       "point3":"truck stop"
    },
    {
       "point1":"bath",
       "point3":"sponge bath"
    },
    {
       "point1":"egg",
       "point3":"eggnog"
    },
    {
       "point1":"rain",
       "point3":"rain dance"
    },
    {
       "point1":"scarf",
       "point3":"wool scarf"
    },
    {
       "point1":"road",
       "point3":"road rage"
    },
    {
       "point1":"wave",
       "point3":"tidal wave"
    },
    {
       "point1":"camera",
       "point3":"disposable camera"
    },
    {
       "point1":"vacation",
       "point3":"paid vacation"
    },
    {
       "point1":"barn",
       "point3":"barn owl"
    },
    {
       "point1":"table",
       "point3":"ping pong table"
    },
    {
       "point1":"ring",
       "point3":"ringtone"
    },
    {
       "point1":"syrup",
       "point3":"maple syrup"
    },
    {
       "point1":"cake",
       "point3":"carrot cake"
    },
    {
       "point1":"drive",
       "point3":"thumb drive"
    },
    {
       "point1":"poop",
       "point3":"poop scoop"
    },
    {
       "point1":"fork",
       "point3":"fork lift"
    },
    {
       "point1":"bar",
       "point3":"salad bar"
    },
    {
       "point1":"wash",
       "point3":"dishwasher"
    },
    {
       "point1":"roast",
       "point3":"pot roast"
    },
    {
       "point1":"spill",
       "point3":"spilled milk"
    },
    {
       "point1":"baby",
       "point3":"babysitter"
    },
    {
       "point1":"dream",
       "point3":"dream team"
    },
    {
       "point1":"sack",
       "point3":"hacky sack"
    },
    {
       "point1":"gas",
       "point3":"gas mask"
    },
    {
       "point1":"circle",
       "point3":"full circle"
    },
    {
       "point1":"fist",
       "point3":"fist bump"
    },
    {
       "point1":"close",
       "point3":"close encounter"
    },
    {
       "point1":"sword",
       "point3":"sword fight"
    },
    {
       "point1":"ant",
       "point3":"anteater"
    },
    {
       "point1":"drum",
       "point3":"drumstick"
    },
    {
       "point1":"salad",
       "point3":"caesar salad"
    },
    {
       "point1":"fire",
       "point3":"first hydrant"
    },
    {
       "point1":"angel",
       "point3":"snow angel"
    },
    {
       "point1":"world",
       "point3":"world map"
    },
    {
       "point1":"bird",
       "point3":"bird cage"
    },
    {
       "point1":"earth",
       "point3":"mother earth"
    },
    {
       "point1":"small",
       "point3":"small fry"
    },
    {
       "point1":"down",
       "point3":"rundown"
    },
    {
       "point1":"batter",
       "point3":"hey, batter, batter!"
    },
    {
       "point1":"easy",
       "point3":"speakeasy"
    },
    {
       "point1":"apple",
       "point3":"bad apple"
    },
    {
       "point1":"sweater",
       "point3":"sweater weather"
    },
    {
       "point1":"seat",
       "point3":"ejection seat"
    },
    {
       "point1":"fence",
       "point3":"electric fence"
    },
    {
       "point1":"alligator",
       "point3":"alligator wrestling"
    },
    {
       "point1":"doughnut",
       "point3":"glazed doughnut"
    },
    {
       "point1":"salt",
       "point3":"salted caramel"
    },
    {
       "point1":"ghost",
       "point3":"ghost town"
    },
    {
       "point1":"advice",
       "point3":"free advice"
    },
    {
       "point1":"finger",
       "point3":"fingernail polish"
    },
    {
       "point1":"bag",
       "point3":"bagpipes"
    },
    {
       "point1":"wall",
       "point3":"wall street"
    },
    {
       "point1":"nap",
       "point3":"catnap"
    },
    {
       "point1":"double",
       "point3":"double trouble"
    },
    {
       "point1":"animal",
       "point3":"animal cracker"
    },
    {
       "point1":"tutor",
       "point3":"math tutor"
    },
    {
       "point1":"pool",
       "point3":"pool noodle"
    },
    {
       "point1":"street",
       "point3":"street sweeper"
    },
    {
       "point1":"nose",
       "point3":"nose job"
    },
    {
       "point1":"wolf",
       "point3":"werewolf"
    },
    {
       "point1":"pan",
       "point3":"panhandle"
    },
    {
       "point1":"up",
       "point3":"upstairs"
    },
    {
       "point1":"old",
       "point3":"old man"
    },
    {
       "point1":"student",
       "point3":"student driver"
    },
    {
       "point1":"police",
       "point3":"police lineup"
    },
    {
       "point1":"zoo",
       "point3":"petting zoo"
    },
    {
       "point1":"rags",
       "point3":"rags to riches"
    },
    {
       "point1":"storm",
       "point3":"thunderstorm"
    },
    {
       "point1":"poker",
       "point3":"poker chip"
    },
    {
       "point1":"stomach",
       "point3":"stomach cramp"
    },
    {
       "point1":"oil",
       "point3":"oil spill"
    },
    {
       "point1":"spot",
       "point3":"sweet spot"
    },
    {
       "point1":"paper",
       "point3":"paper cut"
    },
    {
       "point1":"lip",
       "point3":"lipstick"
    },
    {
       "point1":"watch",
       "point3":"pocket watch"
    },
    {
       "point1":"zebra",
       "point3":"zebra stripes"
    },
    {
       "point1":"nurse",
       "point3":"night nurse"
    },
    {
       "point1":"lion",
       "point3":"lion heart"
    },
    {
       "point1":"note",
       "point3":"sticky note"
    },
    {
       "point1":"lick",
       "point3":"salt lick"
    },
    {
       "point1":"pole",
       "point3":"pole vault"
    },
    {
       "point1":"turtle",
       "point3":"turtle soup"
    },
    {
       "point1":"roll",
       "point3":"rock'n' roll"
    },
    {
       "point1":"kill",
       "point3":"roadkill"
    },
    {
       "point1":"neck",
       "point3":"necktie"
    },
    {
       "point1":"trip",
       "point3":"road trip"
    },
    {
       "point1":"clown",
       "point3":"clown shoes"
    },
    {
       "point1":"under",
       "point3":"under pressure"
    },
    {
       "point1":"name",
       "point3":"nickname"
    },
    {
       "point1":"hot",
       "point3":"hot sauce"
    },
    {
       "point1":"muscle",
       "point3":"musclehead"
    },
    {
       "point1":"tree",
       "point3":"treehouse"
    },
    {
       "point1":"noise",
       "point3":"noise pollution"
    },
    {
       "point1":"trash",
       "point3":"trash can"
    },
    {
       "point1":"club",
       "point3":"club sandwich"
    },
    {
       "point1":"kitchen",
       "point3":"kitchen sink"
    },
    {
       "point1":"mouth",
       "point3":"big mouth"
    },
    {
       "point1":"skirt",
       "point3":"skirt steak"
    },
    {
       "point1":"pail",
       "point3":"lunch pail"
    },
    {
       "point1":"trap",
       "point3":"tourist trap"
    },
    {
       "point1":"pack",
       "point3":"six pack"
    },
    {
       "point1":"shoe",
       "point3":"shoelace"
    },
    {
       "point1":"coffee",
       "point3":"instant coffee"
    },
    {
       "point1":"train",
       "point3":"training wheels"
    },
    {
       "point1":"blanket",
       "point3":"wet blanket"
    },
    {
       "point1":"ketchup",
       "point3":"ketchup packet"
    },
    {
       "point1":"olympics",
       "point3":"summer olympics"
    },
    {
       "point1":"life",
       "point3":"life sentence"
    },
    {
       "point1":"mountain",
       "point3":"mountain man"
    },
    {
       "point1":"short",
       "point3":"short circuit"
    },
    {
       "point1":"pillow",
       "point3":"pillow talk"
    },
    {
       "point1":"five",
       "point3":"high five"
    },
    {
       "point1":"private",
       "point3":"private detective"
    },
    {
       "point1":"track",
       "point3":"tracksuit"
    },
    {
       "point1":"photo",
       "point3":"photo finish"
    },
    {
       "point1":"dog",
       "point3":"doghouse"
    },
    {
       "point1":"belt",
       "point3":"belt loop"
    },
    {
       "point1":"sloppy",
       "point3":"sloppy joe"
    },
    {
       "point1":"money",
       "point3":"money hungry"
    },
    {
       "point1":"shell",
       "point3":"seashell"
    },
    {
       "point1":"dirty",
       "point3":"dirty laundry"
    },
    {
       "point1":"hospital",
       "point3":"hospital gown"
    },
    {
       "point1":"mobile",
       "point3":"mobile home"
    },
    {
       "point1":"airport",
       "point3":"airport security"
    },
    {
       "point1":"milk",
       "point3":"chocolate milk"
    },
    {
       "point1":"flower",
       "point3":"flower power"
    },
    {
       "point1":"phone",
       "point3":"cell phone"
    },
    {
       "point1":"wheel",
       "point3":"ferris wheel"
    },
    {
       "point1":"medicine",
       "point3":"cough medicine"
    },
    {
       "point1":"lemon",
       "point3":"lemon slice"
    },
    {
       "point1":"crayon",
       "point3":"crayon box"
    },
    {
       "point1":"stick",
       "point3":"matchstick"
    },
    {
       "point1":"death",
       "point3":"death wish"
    },
    {
       "point1":"horse",
       "point3":"horseradish"
    },
    {
       "point1":"marriage",
       "point3":"marriage license"
    },
    {
       "point1":"light",
       "point3":"stop light"
    },
    {
       "point1":"market",
       "point3":"stock market"
    },
    {
       "point1":"fly",
       "point3":"flying saucer"
    },
    {
       "point1":"crab",
       "point3":"crab cakes"
    },
    {
       "point1":"shirt",
       "point3":"hawaiian shirt"
    },
    {
       "point1":"pet",
       "point3":"pet rock"
    },
    {
       "point1":"home",
       "point3":"homeless"
    },
    {
       "point1":"park",
       "point3":"public park"
    },
    {
       "point1":"island",
       "point3":"deserted island"
    },
    {
       "point1":"chain",
       "point3":"chain gang"
    },
    {
       "point1":"secret",
       "point3":"secret recipe"
    },
    {
       "point1":"beach",
       "point3":"beach bum"
    },
    {
       "point1":"hole",
       "point3":"black hole"
    },
    {
       "point1":"party",
       "point3":"party pooper"
    },
    {
       "point1":"leather",
       "point3":"leather jacket"
    },
    {
       "point1":"oven",
       "point3":"toaster oven"
    },
    {
       "point1":"sausage",
       "point3":"breakfast sausage"
    },
    {
       "point1":"man",
       "point3":"man cave"
    },
    {
       "point1":"land",
       "point3":"landscape"
    },
    {
       "point1":"cover",
       "point3":"undercover"
    },
    {
       "point1":"knee",
       "point3":"knee socks"
    },
    {
       "point1":"magic",
       "point3":"magic carpet ride"
    },
    {
       "point1":"school",
       "point3":"driving school"
    },
    {
       "point1":"cry",
       "point3":"cry baby"
    },
    {
       "point1":"lap",
       "point3":"laptop"
    },
    {
       "point1":"macaroni",
       "point3":"elbow macaroni"
    },
    {
       "point1":"hip",
       "point3":"hip hop"
    },
    {
       "point1":"lunch",
       "point3":"lunch lady"
    },
    {
       "point1":"thumb",
       "point3":"thumb waar"
    },
    {
       "point1":"dance",
       "point3":"belly dance"
    },
    {
       "point1":"jelly",
       "point3":"jelly doughnut"
    },
    {
       "point1":"lucky",
       "point3":"lucky charm"
    },
    {
       "point1":"seven",
       "point3":"seven deadly sin"
    },
    {
       "point1":"poison",
       "point3":"poison ivy"
    },
    {
       "point1":"high",
       "point3":"high school"
    },
    {
       "point1":"nest",
       "point3":"nest egg"
    },
    {
       "point1":"shark",
       "point3":"hammerhead shark"
    },
    {
       "point1":"carrot",
       "point3":"baby carrot"
    },
    {
       "point1":"white",
       "point3":"white rabbit"
    },
    {
       "point1":"long",
       "point3":"long jump"
    },
    {
       "point1":"strawberry",
       "point3":"strawberry jam"
    },
    {
       "point1":"nail",
       "point3":"nail-biter"
    },
    {
       "point1":"juice",
       "point3":"orange juice"
    },
    {
       "point1":"door",
       "point3":"door knob"
    },
    {
       "point1":"toast",
       "point3":"burnt toast"
    },
    {
       "point1":"meat",
       "point3":"meat eater"
    },
    {
       "point1":"snow",
       "point3":"snowball fight"
    },
    {
       "point1":"doctor",
       "point3":"foot doctor"
    },
    {
       "point1":"leg",
       "point3":"chicken leg"
    },
    {
       "point1":"burrito",
       "point3":"breakfast burrito"
    },
    {
       "point1":"jeans",
       "point3":"blue jeans"
    },
    {
       "point1":"binner",
       "point3":"dinner roll"
    },
    {
       "point1":"start",
       "point3":"startup"
    },
    {
       "point1":"crack",
       "point3":"plumber's crack"
    },
    {
       "point1":"ten",
       "point3":"perfect ten"
    },
    {
       "point1":"diamond",
       "point3":"baseball diamond"
    },
    {
       "point1":"square",
       "point3":"town square"
    },
    {
       "point1":"penny",
       "point3":"lucky penny"
    },
    {
       "point1":"jar",
       "point3":"tip jar"
    },
    {
       "point1":"day",
       "point3":"daylight"
    },
    {
       "point1":"food",
       "point3":"fast food"
    },
    {
       "point1":"pink",
       "point3":"pink panther"
    },
    {
       "point1":"foil",
       "point3":"tin foil hat"
    },
    {
       "point1":"date",
       "point3":"blind date"
    },
    {
       "point1":"soft",
       "point3":"soft pretzel"
    },
    {
       "point1":"boat",
       "point3":"rowboat"
    },
    {
       "point1":"flame",
       "point3":"flamethrower"
    },
    {
       "point1":"dark",
       "point3":"dark horse"
    },
    {
       "point1":"fish",
       "point3":"fishing pole"
    },
    {
       "point1":"coal",
       "point3":"coal miner"
    },
    {
       "point1":"tiger",
       "point3":"tiger cub"
    },
    {
       "point1":"ninja",
       "point3":"silent ninja"
    },
    {
       "point1":"soup",
       "point3":"soup spoon"
    },
    {
       "point1":"brick",
       "point3":"brick layer"
    },
    {
       "point1":"fight",
       "point3":"pillow fight"
    },
    {
       "point1":"computer",
       "point3":"super computer"
    },
    {
       "point1":"jacket",
       "point3":"yellow jacket"
    },
    {
       "point1":"bride",
       "point3":"bridezilla"
    },
    {
       "point1":"star",
       "point3":"shooting star"
    },
    {
       "point1":"climb",
       "point3":"rock climbing"
    },
    {
       "point1":"wood",
       "point3":"wooden teeth"
    },
    {
       "point1":"piano",
       "point3":"dueling pianos"
    },
    {
       "point1":"socks",
       "point3":"loose socks"
    },
    {
       "point1":"mate",
       "point3":"checkmate"
    },
    {
       "point1":"shrimp",
       "point3":"jumbo shrimp"
    },
    {
       "point1":"pants",
       "point3":"cargo pants"
    },
    {
       "point1":"kick",
       "point3":"scissor kick"
    },
    {
       "point1":"bowl",
       "point3":"goldfish bowl"
    },
    {
       "point1":"snake",
       "point3":"rattlesnake"
    },
    {
       "point1":"morning",
       "point3":"morning person"
    },
    {
       "point1":"ice",
       "point3":"ice cream sandwich"
    },
    {
       "point1":"chicken",
       "point3":"chicken nugget"
    },
    {
       "point1":"hunt",
       "point3":"hunting party"
    },
    {
       "point1":"plate",
       "point3":"paper plate"
    },
    {
       "point1":"hungry",
       "point3":"power hungry"
    },
    {
       "point1":"boil",
       "point3":"hard-boiled egg"
    },
    {
       "point1":"stamp",
       "point3":"stamp collection"
    },
    {
       "point1":"bun",
       "point3":"cinnamon bun"
    },
    {
       "point1":"house",
       "point3":"roughhouse"
    },
    {
       "point1":"picnic",
       "point3":"picnic basket"
    },
    {
       "point1":"hotel",
       "point3":"five star hotel"
    },
    {
       "point1":"bottle",
       "point3":"bottle rocket"
    },
    {
       "point1":"shower",
       "point3":"cold shower"
    },
    {
       "point1":"chef",
       "point3":"pastry chef"
    },
    {
       "point1":"army",
       "point3":"army ant"
    },
    {
       "point1":"guitar",
       "point3":"acoustic guitar"
    },
    {
       "point1":"first",
       "point3":"first lady"
    },
    {
       "point1":"bacon",
       "point3":"bacon, bacon, bacon!"
    },
    {
       "point1":"smoke",
       "point3":"smoke stack"
    },
    {
       "point1":"cheese",
       "point3":"grilled cheese"
    },
    {
       "point1":"head",
       "point3":"bonehead"
    },
    {
       "point1":"pizza",
       "point3":"pizza pie"
    },
    {
       "point1":"gum",
       "point3":"gumball"
    },
    {
       "point1":"dead",
       "point3":"dead weight"
    },
    {
       "point1":"heart",
       "point3":"broken heart"
    },
    {
       "point1":"pitch",
       "point3":"pitchfork"
    },
    {
       "point1":"team",
       "point3":"swim team"
    },
    {
       "point1":"chair",
       "point3":"rocking chair"
    },
    {
       "point1":"hawk",
       "point3":"mohawk"
    },
    {
       "point1":"bathroom",
       "point3":"public bathroom"
    },
    {
       "point1":"mind",
       "point3":"mind reader"
    },
    {
       "point1":"movie",
       "point3":"movie popcorn"
    },
    {
       "point1":"skin",
       "point3":"snake skin"
    },
    {
       "point1":"bounce",
       "point3":"bounce back"
    },
    {
       "point1":"love",
       "point3":"love letter"
    },
    {
       "point1":"crumb",
       "point3":"cookie crumbs"
    },
    {
       "point1":"side",
       "point3":"bedside"
    },
    {
       "point1":"blade",
       "point3":"rollerblade"
    },
    {
       "point1":"quiz",
       "point3":"pop quiz"
    },
    {
       "point1":"menu",
       "point3":"breakfast menu"
    },
    {
       "point1":"hamster",
       "point3":"hamster wheel"
    },
    {
       "point1":"birthday",
       "point3":"surprised birthday party"
    },
    {
       "point1":"toy",
       "point3":"toy poodle"
    },
    {
       "point1":"cart",
       "point3":"shopping cart"
    },
    {
       "point1":"tooth",
       "point3":"tooth fairy"
    },
    {
       "point1":"pie",
       "point3":"pie crust"
    },
    {
       "point1":"silent",
       "point3":"silent night"
    },
    {
       "point1":"candy",
       "point3":"cotton candy"
    },
    {
       "point1":"tongue",
       "point3":"tongue-tied"
    },
    {
       "point1":"puppy",
       "point3":"puppy party"
    },
    {
       "point1":"wife",
       "point3":"trophy wife"
    },
    {
       "point1":"bug",
       "point3":"lightning bug"
    },
    {
       "point1":"toilet",
       "point3":"toilet paper"
    },
    {
       "point1":"pumpkin",
       "point3":"pumpkin patch"
    },
    {
       "point1":"window",
       "point3":"window shopping"
    },
    {
       "point1":"sand",
       "point3":"sandstorm"
    },
    {
       "point1":"split",
       "point3":"split ends"
    },
    {
       "point1":"clam",
       "point3":"clam chowder"
    },
    {
       "point1":"talk",
       "point3":"talk radio"
    },
    {
       "point1":"pickle",
       "point3":"pickle jar"
    },
    {
       "point1":"hair",
       "point3":"bad hair day"
    },
    {
       "point1":"brush",
       "point3":"paintbrush"
    },
    {
       "point1":"tape",
       "point3":"tape recorder"
    },
    {
       "point1":"parade",
       "point3":"parade float"
    },
    {
       "point1":"fall",
       "point3":"trust fall"
    },
    {
       "point1":"crash",
       "point3":"wedding crasher"
    },
    {
       "point1":"sun",
       "point3":"sunburn"
    },
    {
       "point1":"break",
       "point3":"winter break"
    },
    {
       "point1":"wedding",
       "point3":"wedding ring"
    },
    {
       "point1":"pump",
       "point3":"pump iron"
    },
    {
       "point1":"taco",
       "point3":"taco salad"
    },
    {
       "point1":"cone",
       "point3":"waffle cone"
    },
    {
       "point1":"golf",
       "point3":"mini golf"
    },
    {
       "point1":"bench",
       "point3":"bench warner"
    },
    {
       "point1":"suit",
       "point3":"bathing suit"
    },
    {
       "point1":"cookie",
       "point3":"fortune cookie"
    },
    {
       "point1":"spoon",
       "point3":"measuring spoon"
    },
    {
       "point1":"butterfly",
       "point3":"butterfly kiss"
    },
    {
       "point1":"family",
       "point3":"crime family"
    },
    {
       "point1":"pull",
       "point3":"pull up"
    },
    {
       "point1":"walk",
       "point3":"sleep walking"
    },
    {
       "point1":"room",
       "point3":"emergency room"
    },
    {
       "point1":"empty",
       "point3":"empty calories"
    },
    {
       "point1":"moon",
       "point3":"half moon"
    },
    {
       "point1":"taste",
       "point3":"taste buds"
    },
    {
       "point1":"bucket",
       "point3":"bucket list"
    },
    {
       "point1":"email",
       "point3":"email scam"
    },
    {
       "point1":"cup",
       "point3":"sippy cup"
    },
    {
       "point1":"refrigerator",
       "point3":"refrigerator sale"
    },
    {
       "point1":"puddle",
       "point3":"puddle jumper"
    },
    {
       "point1":"bank",
       "point3":"bank robber"
    },
    {
       "point1":"north",
       "point3":"north pole"
    },
    {
       "point1":"tall",
       "point3":"tall order"
    },
    {
       "point1":"peace",
       "point3":"peacemaker"
    },
    {
       "point1":"sink",
       "point3":"sinkhole"
    },
    {
       "point1":"brother",
       "point3":"twin brother"
    },
    {
       "point1":"gold",
       "point3":"gold rush"
    },
    {
       "point1":"bread",
       "point3":"banana bread"
    },
    {
       "point1":"funeral",
       "point3":"funeral home"
    },
    {
       "point1":"pork",
       "point3":"pork belly"
    },
    {
       "point1":"newspaper",
       "point3":"newspaper headline"
    },
    {
       "point1":"button",
       "point3":"panic button"
    },
    {
       "point1":"glove",
       "point3":"boxing glove"
    },
    {
       "point1":"pancake",
       "point3":"blueberry pancake"
    },
    {
       "point1":"fry",
       "point3":"french fry"
    },
    {
       "point1":"dirt",
       "point3":"dirt road"
    },
    {
       "point1":"whale",
       "point3":"beached whale"
    },
    {
       "point1":"butterfly",
       "point3":"butter ball"
    },
    {
       "point1":"blood",
       "point3":"blood bank"
    },
    {
       "point1":"cow",
       "point3":"cash cow"
    },
    {
       "point1":"voice",
       "point3":"voicemail"
    },
    {
       "point1":"chocolate",
       "point3":"hot chocolate"
    },
    {
       "point1":"vegetable",
       "point3":"vegetable garden"
    },
    {
       "point1":"massage",
       "point3":"massage table"
    },
    {
       "point1":"sweat",
       "point3":"cold sweat"
    },
    {
       "point1":"band",
       "point3":"heavy metal band"
    },
    {
       "point1":"hat",
       "point3":"top hat"
    },
    {
       "point1":"bubble",
       "point3":"bubble bath"
    },
    {
       "point1":"fruit",
       "point3":"fruitcake"
    },
    {
       "point1":"dad",
       "point3":"dad joke"
    },
    {
       "point1":"teacher",
       "point3":"substitute teacher"
    },
    {
       "point1":"brain",
       "point3":"brainwash"
    },
    {
       "point1":"surgery",
       "point3":"plastic surgery"
    },
    {
       "point1":"boy",
       "point3":"water boy"
    },
    {
       "point1":"frog",
       "point3":"leap frog"
    },
    {
       "point1":"ride",
       "point3":"rideshare"
    },
    {
       "point1":"happy",
       "point3":"happy hour"
    },
    {
       "point1":"rice",
       "point3":"sticky rice"
    },
    {
       "point1":"sleep",
       "point3":"sleeping giant"
    },
    {
       "point1":"belly",
       "point3":"yellow belly"
    },
    {
       "point1":"green",
       "point3":"breen thumb"
    },
    {
       "point1":"root",
       "point3":"root beer"
    },
    {
       "point1":"stone",
       "point3":"stonehenge"
    },
    {
       "point1":"bee",
       "point3":"bee sting"
    },
    {
       "point1":"friend",
       "point3":"best friends"
    },
    {
       "point1":"bedroom",
       "point3":"guest bedroom"
    },
    {
       "point1":"handle",
       "point3":"handlebar"
    },
    {
       "point1":"bus",
       "point3":"bus stop"
    },
    {
       "point1":"question",
       "point3":"trick question"
    },
    {
       "point1":"cut",
       "point3":"short cut"
    }
  ]
}