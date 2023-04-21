const inquirer = require("inquirer");
const Trainer = require("./lib/Trainer")
const trainers = [new Trainer("joe")];
trainers[0].addPokemon("snorlax",100,10);
trainers[0].addPokemon("stramie",10,1);
trainers[0].addPokemon("margikarp",10,1);

const askQuestion = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "what would you like to do?",
        choices: ["Create a Trainer", "Add Pokemon", "Get Random Pokemon", "Quit"],
      },
    ])
    .then((ans) => {
      switch (ans.choice) {
        case "Create a Trainer":
          createTrainer()
          break;
        case "Add Pokemon":
          addPokemon()
          break;
        case "Get Random Pokemon":
          getRandomPokemon()
          break;

        default:
          console.log("thanks for playing!");
          break;
      }
    });
};

const createTrainer = () => {
  inquirer.prompt({
    name:"trainer",
    type:"input",
    message:"Who are who will be the very best, as no one ever was?"

  }).then(ans=>{
    const me = new Trainer(ans.trainer);
    trainers.push(me);
    console.table(trainers)
    askQuestion();
  })
};

const addPokemon = ()=>{
    if(!trainers.length){
        console.log("add a trainer first!")
        return askQuestion();
    }
    // const inqTrainers = [];
    // for (let i = 0; i < trainers.length; i++) {
    //     const inqTrainer = {
    //         name:trainers[i].name,
    //         value:trainers[i]
    //     }
    //     inqTrainers.push(inqTrainer)
        
    // }

    const inqTrainers = trainers.map(trainObj=>{
        return {
            name:trainObj.name,
            value:trainObj
        }
    })

    inquirer.prompt([
        {
            name:"trainerObj",
            type:"list",
            choices:inqTrainers,
            message:"What the number of the trainer in the chart above?"
        },
        {
            name:"pokeName",
            message:"What is the pokemons name?"
        }, {
            name:"pokeHp",
            message:"What is the pokemons hp?"
        },  {
            name:"pokeAtk",
            message:"What is the pokemons atk?"
        }
    ]).then(ans=>{
        ans.trainerObj.addPokemon(ans.pokeName,ans.pokeHp,ans.pokeAtk);
        console.log(ans.trainerObj)
        askQuestion();
    })
}
const getRandomPokemon = ()=>{
    const inqTrainers = trainers.filter(trainer=>{
        return trainer.pokemon.length
    }).map(trainObj=>{
        return {
            name:trainObj.name,
            value:trainObj
        }
    })
    if(!inqTrainers.length){
        console.log("add a trainer and some pokemon first!")
        return askQuestion();
    }

    console.table(trainers)
    inquirer.prompt([
        {
            name:"trainerObj",
            type:"list",
            choices:inqTrainers,
            message:"Which trainer"
        }
    ]).then(ans=>{
        const randoMon = ans.trainerObj.getRandomPokemon();
        console.log(`I choose you, ${randoMon.name}!`)
        console.log(randoMon)
        askQuestion();
    })
}

askQuestion();
