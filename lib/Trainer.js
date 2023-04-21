const Pokemon = require("./Pokemon")
class Trainer {
    constructor(name){
        this.name=name;
        this.pokemon=[];
    }
    addPokemon(name,hp,atk){
        const newPoke = new Pokemon(name,hp,atk);
        this.pokemon.push(newPoke)
    }
    getRandomPokemon(){
        const randoMon = this.pokemon[Math.floor(Math.random()*this.pokemon.length)]
        return randoMon;
    }
    
}

// Trainer.prototype.getRandomPokemon = function(){
//     const randoMon = this.pokemon[Math.floor(Math.random()*this.pokemon.length)]
//     return randoMon;
// }

module.exports = Trainer