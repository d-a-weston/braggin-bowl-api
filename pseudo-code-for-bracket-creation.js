

function createBracket(playerList, teamSize, ) {

    var currentIndex = playerList.length, temporaryValue, randomIndex, players_on_by, num_of_teams;

    num_of_teams = Math.floor(playerList.length / teamSize);
    players_on_by =  teamSize - (players % teamSize);

    //Fisher-Yates (aka Knuth) Shuffle
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    //Assin
    for(var i=0; i < num_of_teams; i++){  //tracks team number "i"

        for(var k=(i*teamSize); k < teamSize; k++){
            //assign team[i] to player at playerList[k] 
        }
    }

    if(players_on_by > 0){
        for(var i=(playerList.length - players_on_by); i < playerList.length; i++){
            //assign player at playerList[i] a by
        }
        
    }
    
    

}
