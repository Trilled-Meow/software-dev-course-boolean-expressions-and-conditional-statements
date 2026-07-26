/*

Objective:
You will practice creating and combining boolean expressions
to drive logic and outcomes in you program.

Instructions:
If you are not familiar with the concept of a text-based adventure game,
let's set the scene...
Example: "You wake up in a dark forest. There are two paths ahead of you:
one leading to the mountains and one to a village.
Your choices will determine your fate!"

Define the Requirements: You must:
  - Write conditional statements to handle player choices.
  - Use boolean expressions to combine multiple conditions.
  - Include at least one use of logical operators (&&, ||, !).

Starter Code:
  - Run the following command in your terminal to install the readline-sync module:
    npm install readline-sync

Paste the following code into your editor:

*/


const readline = require('readline-sync');

let hasTorch = false;
let hasMountainsMap = false;
let hasRustySword = false;
let hasFarmAxe = false;
let hasLeatherVest = false;
let hasOneShoe = false;
let healthPotions = 0;
let gold = 0;
const yesOrNo = ["yes", "no"];
let location = "start";
let locations = ["crossroads", "village", "mountains", "valley"];
let villageLocations = ["shops", "inn", "quest board"];
let endingsUnlocked = [];
const badEnd1 = "Lost in Woods";
const badEnd2 = "Caught in Sleep";
let characterLevel = 1;
let experiencePoints = 0;

console.log("You're at a misty crossroads. You can make out something on the ground that looks long and thin.");
  const choice1 = readline.keyInSelect(yesOrNo, "\nPick it up?");
  if (yesOrNo[choice1] === "yes") {
    hasTorch = true;
    console.log("You found a torch! This should come in handy.");
  }

console.log("You see two paths: one leads to the mountains, the other to the village.");
const choice2 = readline.question("\nDo you go to the 'mountains' or the 'village'? ");

if (choice2.trim().toLowerCase() === "mountains" && hasTorch) {
    location = "mountains";
    console.log(`
      
      You safely navigate through the dark mountains with the torch and reach a cave.
      
      Through the torchlight, you can see paintings on the walls. On the floor, you see the glint of metal.`);
    let choice2a = readline.keyInSelect(yesOrNo, "\nExamine the metal object?");
    if (yesOrNo[choice2a] === "yes") {
      hasRustySword = true;
      console.log("You've found a sword! It's rusty, but it could still be useful.");
    }
    else if (yesOrNo[choice2a] === "no") { 
      console.log("Right... Probably junk. Wait, there's another glint other here.")
      gold = gold + 10;
      console.log("Found 10 Gold!");
    }
    let tempLocations = ["cave", "village"];
    let choice2b = readline.keyInSelect(tempLocations, "\nStay in the cave for the night, or head to the village?");
    if (tempLocations[choice2b] === "cave") {
      if (!hasRustySword && !hasFarmAxe) {
        console.log("Bandits attack you in your sleep, and you have nothing to defend yourself with. Tough luck. What were you thinking?");
        endingsUnlocked.push(badEnd2);
        console.log(`You unlocked ${badEnd2} in the endings gallery.`);
        console.log(`Endings unlocked: ${endingsUnlocked}`);
        readline.keyInPause("Press any key to exit the game..."); 
      }
      else if (hasRustySword || hasFarmAxe) {
        console.log("Two rubes enter the cave in the middle of the night. When they see your weapon, they flee, dropping some items.");
        console.log(`EXP: 4 /tGold: 2
          Found Health Potion!
          Found One Shoe!`);
          gold = gold +2;
          experiencePoints = experiencePoints + 4;
          healthPotions = healthPotions + 1;
          hasOneShoe = true;
          readline.keyInPause("Press any key to exit the game..."); 
      }
    }
    else if (choice2b === "village") {
      location = village;
      console.log("You find your way to the village.");
    }
} else if (choice2 === "mountains" && !hasTorch) {
    console.log("It's too dark to proceed. You decide to turn back.");
    let choice2c = readline.keyInSelect(yesOrNo, "\nOr do you?");
    if (yesOrNo[choice2c] === "no"){
      console.log("You get lost and wander aimlessly in the woods You injure your leg in the dark, and no one is there to help you. \nWhat were you thinking?");
      console.log(`You unlocked ${badEnd1} in the endings gallery.`)
      endingsUnlocked.push(badEnd1);
      console.log(`Endings unlocked: ${endingsUnlocked}`);
      readline.keyInPause("Press any key to exit the game..."); 
    }
} else if (choice2.trim().toLowerCase() === "village") {
    location = "village";
    console.log("You find your way to the village.");
} else if (choice2 === "mountains" && hasMap){
    location = "valley";
    console.log("Using the map, you're able to navigate through a hidden pass to a valley.");
    readline.keyInPause("Press any key to exit the game..."); 
};

if (location === "village") {
  console.log("Welcome to Riverview! We have shops, an inn, and a quest board.");
  const choice3a = readline.keyInSelect(villageLocations, "\nWhere do you want to go?");
  if ((villageLocations[choice3a] === "inn") || (villageLocations[choice3a] === "shops") && (gold === 0)){

    console.log("You don't have any money!"); 
    readline.keyInPause("Press any key to exit the game..."); 
}
  else if ((villageLocations[choice3a] === "shops") && (gold >=1)) {
    console.log(`Welcome to the general store. Let me know which you'd like.
     Item \tPrice
     Health Potion \t2 gold
     Leather Vest \t5 gold
  Mountain Map \t5 gold`);

    let shopInventoryTemp = ["Health Potion", "Leather Vest", "Mountain Map", "Nothing for now"];
    let shopChoiceTemp = readline.keyInSelect(shopInventoryTemp, "\nWhich would you like to purchase?");
    if (shopInventoryTemp[shopChoiceTemp] === "Health Potion") {
      healthPotions = healthPotions +1;
      gold = gold -2;
      console.log(`Would you like anything else?
        Item \tPrice
        Health Potion \t2 gold
        Leather Vest \t5 gold
        Mountain Map \t5 gold
        
        Your gold: ${gold}`);
    }
    else if (shopInventoryTemp[shopChoiceTemp] === "Leather Vest"){
      hasLeatherVest = true;
      gold = gold - 5;
      shopInventoryTemp.splice(shopInventoryTemp.indexOf("Leather Vest"));
      console.log(`Would you like anything else?
        Item \tPrice
        Health Potion \t2 gold
        Mountain Map \t5 gold
        
        Your gold: ${gold}`);
        readline.keyInPause("Press any key to exit the game..."); 
    }
    else if (shopInventoryTemp[shopChoiceTemp] === "Mountain Map") {
      hasMountainsMap = true;
      gold = gold - 5;
      shopInventoryTemp.splice(shopInventoryTemp.indexOf("Mountain Map"));
      console.log(`Would you like anything else?
        Item \tPrice
        Health Potion \t2 gold
        Leather Vest \t5 gold
        
        Your gold: ${gold}`);
        readline.keyInPause("Press any key to exit the game..."); 
    }
    else if (shopInventoryTemp[shopChoiceTemp] === "Nothing for now"){
      console.log("Take care you don't go up that mountain unprepared.");
      readline.keyInPause("Press any key to exit the game..."); 
    }
  }
else if (villageLocations[choice3a] === "quest board") {
    console.log(`What am I? Level ${characterLevel}? I'm sure there's some busy work somewhere on the board...`);
    console.log(`Ahh... yes here we are. 
      Quest: \tTrouble in the Bakery \tLevel Required: \t1
      Description: \tClear out the rats in the bakery's cellar. We'll provide an old axe upon receipt of the quest
      and enough gold to buy a Health Potion.

      Rewards: 10 Gold`);
    const ratQuestOffer = readline.keyInSelect(yesOrNo, "\nAccept the quest?");
      if (yesOrNo[ratQuestOffer] === "yes"){
        hasFarmAxe = true;
        gold = gold +2;
        console.log(`You've accepted the quest.
          Received Farm Axe!
          Received 2 gold!

          `);
          let travelLocationsTemp = ["shops", "inn", "crossroads", "bakery cellar"];
          let travelChoiceTemp = readline.keyInSelect(travelLocationsTemp, "\nWhere to now?");
          if ((travelLocationsTemp[travelChoiceTemp] === "shops") && gold >= 1){
              location = "shops";
              console.log(`Welcome to the general store.
              Item \tPrice
              Health Potion \t2 gold
              Leather Vest \t5 gold
              Mountain Map \t5 gold`);
              
                let shopInventoryTemp = ["Health Potion", "Leather Vest", "Mountain Map", "Nothing for now"];
                let shopChoiceTemp = readline.keyInSelect(shopInventoryTemp, "\nWhich would you like to purchase?");
                if (shopInventoryTemp[shopChoiceTemp] === "Health Potion") {
                    healthPotions = healthPotions +1;
                    gold = gold -2;
                    console.log(`Would you like anything else?
                    Item \tPrice
                    Health Potion \t2 gold
                    Leather Vest \t5 gold
                    Mountain Map \t5 gold
            
                    Your gold: ${gold}`);
                    readline.keyInPause("Press any key to exit the game..."); 
                 }
                else if (shopInventoryTemp[shopChoiceTemp] === "Leather Vest"){
                  hasLeatherVest = true;
                  gold = gold - 5;
                  shopInventoryTemp.splice(shopInventoryTemp.indexOf("Leather Vest"));
                  console.log(`Would you like anything else?
                  Item \tPrice
                  Health Potion \t2 gold
                  Mountain Map \t5 gold
            
                  Your gold: ${gold}`);
                  readline.keyInPause("Press any key to exit the game..."); 
                   }
                else if (shopInventoryTemp[shopChoiceTemp] === "Mountain Map") {
                  hasMountainsMap = true;
                  gold = gold - 5;
                  shopInventoryTemp.splice(shopInventoryTemp.indexOf("Mountain Map"));
                  console.log(`Would you like anything else?
                  Item \tPrice
                  Health Potion \t2 gold
                  Leather Vest \t5 gold
            
                  Your gold: ${gold}`);
                  readline.keyInPause("Press any key to exit the game..."); 
                  }
                else if (shopInventoryTemp[shopChoiceTemp] === "Nothing for now"){
                  console.log("Take care you don't go up that mountain unprepared.");
                  readline.keyInPause("Press any key to exit the game..."); 
                }
          }
      }
      else {
        console.log("Where would you like to go?");
        let travelLocationsTemp = ["shops", "inn", "crossroads"];
        readline.keyInPause("Press any key to exit the game..."); 
      };
  };
};


/* 

Add Customization and expand the game:
  - Add more choices and scenarios.
  - Include additional items (e.g., a sword, a compass).
  - Use nested conditionals and logical operators to create complex outcomes.

*/