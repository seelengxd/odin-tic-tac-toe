function Player(tag){
  return { tag }
}

function Spot(){
  let value = ''
  const isTaken = () => value != ''
  function pick(tag){
    if (isTaken()) return false;
    else {
      value = tag
      card.textContent = value
      return true;
    }
  }
  const getValue = () => value;

  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = value
  return { card, pick, getValue, isTaken }

}

const game = (function () {
  const players = [Player('X'), Player('O')]
  let currentPlayerIndex = 0;
  let currentPlayer = players[currentPlayerIndex];

  function getNextPlayer(){
    currentPlayerIndex = (currentPlayerIndex + 1) % 2
    currentPlayer = players[currentPlayerIndex];
  }

  function handlePossibleGameEnd(){
    result = gameBoard.checkWin()
    if (result){
      if (result == 'Tie'){
        alert('TIE')
      }
      else {
        alert(`${result} WINS`)
      }
    }
  }

  const gameBoard = ( function (){
    const container = document.querySelector(".container")
    const grid = [...Array(3)].map(x=>Array(3))
    let movesLeft = 9;
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        let spot = Spot()
        grid[i][j] = spot;
        card = spot.card
        container.appendChild(card)
        card.addEventListener('click', function (){
          spot.pick(currentPlayer.tag)
          getNextPlayer();
          movesLeft--;
          handlePossibleGameEnd();
        })
      }
    }

    function checkWin(){
      // horizontal
      for (let i = 0; i < 3; i++){
        if (grid[i][0].isTaken() && grid[i].every(spot => spot.getValue() == grid[i][0].getValue())){
          return grid[i][0].getValue()
        }
      }
      // vertical
      for (let i = 0; i < 3; i++){
        if (grid[0][i].isTaken() && grid[0][i].getValue() == grid[1][i].getValue() && grid[0][i].getValue() == grid[2][i].getValue()){
          return grid[0][i].getValue()
        }
      }

      // diagonal
      if (grid[1][1].isTaken()){
        mid = grid[1][1].getValue()
        if (grid[0][0].getValue() == mid && grid[2][2].getValue() == mid){
          return mid;
        } else if (grid[2][0].getValue() == mid && grid[0][2].getValue() == mid){
          return mid
        }
      }
      return movesLeft == 0 ? 'Tie' : ''

    }

    return { checkWin }

  } )()

})();