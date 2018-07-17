
let board = [
  14, 13, 12, 15, 16, 12, 13, 14,
  11, 11, 11, 11, 11, 11, 11, 11,
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
  1, 1, 1, 1, 1, 1, 1, 1,
  4, 3, 2, 5, 6, 2, 3, 4]
let boardTeam = [
  "White", "White", "White", "White", "White", "White", "White",
  "White",
  "White", "White", "White", "White", "White", "White", "White", 
  "White",
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
  "Black", "Black", "Black", "Black", "Black", "Black", "Black", "Black",
  "Black", "Black", "Black", "Black", "Black", "Black", "Black", "Black" 
];
// Blank - Nothing
// 1 - Black Pawn
// 2 - Black Bishop
// 3 - Black Knight
// 4 - Black Castle
// 5 - Black King
// 6 - Black Queen
// 11 - White Pawn
// 12 - White Bishop
// 13 - White Knight
// 14 - White Castle
// 15 - White King
// 16 - White Queen


let pieceSelected = false;
let legalMoves = [];
let turn = "White";

$('document').ready(function () {
  // Creating board
  for (let i = 0; i < 64; i++) {
    if ((Math.floor(i / 8)) % 2 === 0) {
      if (i % 2 === 0) {
        $('#gameBoard').append(`<div id=${i} class="square odd"></div>`)
      } else {
        $('#gameBoard').append(`<div id=${i} class="square even"></div>`)
      }
    } else {
      if (i % 2 === 0) {
        $('#gameBoard').append(`<div id=${i} class="square even"></div>`)
      } else {
        $('#gameBoard').append(`<div id=${i} class="square odd"></div>`)
      }
    }
    $(`#${i}`).click(function () {
      // Selecting and de-selecting a piece
      if (turn === "White" && board[i] > 10 && board[i] < 17) {
        if (!pieceSelected && pieceSelected !== 0) {
          $(`#${i}`).css({ background: "orange" })
          pieceSelected = i;
          showMoves(i, board[i])
        } else if (pieceSelected === i) {
          pieceSelected = false;
          legalMoves = [];
          for (let j = 0; j < 64; j++) {
            reset(j)
          }
        }
      } else if (turn === "Black" && board[i] > 0 && board[i] < 7) {
        if (!pieceSelected && pieceSelected !== 0) {
          $(`#${i}`).css({ background: "orange" })
          pieceSelected = i;
          showMoves(i, board[i])
        } else if (pieceSelected === i) {
          pieceSelected = false;
          legalMoves = [];
          for (let j = 0; j < 64; j++) {
            reset(j)
          }
        }
      }
      // Moving a piece
      if (pieceSelected || pieceSelected === 0) {
        if (legalMoves.includes(i)) {
          console.log(pieceSelected, i)
          $(`#${pieceSelected}`).html("")
          let piece;
          if (board[pieceSelected] === 1 || board[pieceSelected] === 11) {
            piece = "Pawn"
          } else if (board[pieceSelected] === 2 || board[pieceSelected] === 12) {
            piece = "Bishop"
          } else if (board[pieceSelected] === 3 || board[pieceSelected] === 13) {
            piece = "Knight"
          } else if (board[pieceSelected] === 4 || board[pieceSelected] === 14) {
            piece = "Castle"
          } else if (board[pieceSelected] === 5 || board[pieceSelected] === 15) {
            piece = "King"
          } else if (board[pieceSelected] === 6 || board[pieceSelected] === 16) {
            piece = "Queen"
          } 
          boardTeam[i] = turn;
          board[i] = board[pieceSelected]
          boardTeam[pieceSelected] = undefined;
          board[pieceSelected] = undefined;
          $(`#${i}`).html("")
          $(`#${i}`).append(`<img class="piece" src="${turn.toLowerCase()}${piece}.png">`);
          for (let j = 0; j < 64; j++) {
            reset(j)
          }
          legalMoves = [];
          pieceSelected = false;
          if (turn === "White") {
            turn = "Black"
            $('#turn').text("Turn: Black")
          } else {
            turn = "White";
            $('#turn').text("Turn: White")
          }
        }
      }
    })
  }
  // Adding pieces
  // Black Pawns - 1
  for (let i = 48; i < 56; i++) {
    $(`#${i}`).append(`<img class="piece" src="blackPawn.png">`)
  }
  // Black Bishops - 2
  $('#58').append('<img class="piece" src="blackBishop.png">')
  $('#61').append('<img class="piece" src="blackBishop.png">')
  // Black Knight - 3
  $('#57').append('<img class="piece" src="blackKnight.png">')
  $('#62').append('<img class="piece" src="blackKnight.png">')
  // Black Castle - 4
  $('#56').append('<img class="piece" src="blackCastle.png">')
  $('#63').append('<img class="piece" src="blackCastle.png">')
  // Black King - 5
  $('#59').append('<img class="piece" src="blackKing.png">')
  // Black Queen - 6
  $('#60').append('<img class="piece" src="blackQueen.png">') 

  // White Pawns - 11
  for (let i = 8; i < 16; i++) {
    $(`#${i}`).append('<img class="piece" src="whitePawn.png">')
  }
  // White Bishops - 12
  $('#2').append('<img class="piece" src="whiteBishop.png">')
  $('#5').append('<img class="piece" src="whiteBishop.png">')
  // White Knight - 13
  $('#1').append('<img class="piece" src="whiteKnight.png">')
  $('#6').append('<img class="piece" src="whiteKnight.png">')
  // White Castle - 14
  $('#0').append('<img class="piece" src="whiteCastle.png">')
  $('#7').append('<img class="piece" src="whiteCastle.png">')
  // White King - 15
  $('#3').append('<img class="piece" src="whiteKing.png">')
  // White Queen - 16
  $('#4').append('<img class="piece" src="whiteQueen.png">')
})
// Reseting blue squares
function reset(i) {
  if ((Math.floor(i / 8)) % 2 === 0) {
    if (i % 2 === 0) {
      $(`#${i}`).css({ background: "#f9db7a" })
    } else {
      $(`#${i}`).css({ background: "#e4c444" })
    }
  } else {
    if (i % 2 === 0) {
      $(`#${i}`).css({ background: "#e4c444" })
    } else {
      $(`#${i}`).css({ background: "#f9db7a" })
    }
  }
}

function showMoves(square, type) {
  let possibleMove = square;
  let opposite;
  if (turn === "White") {
    opposite = "Black"
  } else {
    opposite = "White"
  }
  // Black Pawn
  if (type === 1) {
    // Up
    if (square / 8 >= 1 && !board[square - 8]) {
      $(`#${square - 8}`).css({ background: "blue" })      
      legalMoves.push(square - 8)
    }
    // Two Up
    if (Math.floor(square / 8) === 6 && !board[square - 16]) {
      $(`#${square - 16}`).css({ background: "blue" })
      legalMoves.push(square - 16)
    }
    // Up Left
    if (square / 8 > 1 && square % 8 > 0 && boardTeam[square - 9] === "White") {
      $(`#${square - 9}`).css({ background: "blue" })      
      legalMoves.push(square - 9)
    }
    // Up Right
    if (square / 8 > 1 && square % 8 < 7 && boardTeam[square - 7] === "White") {
      $(`#${square - 7}`).css({ background: "blue" })
      legalMoves.push(square - 7)
    }
  // White Pawn
  } else if (type === 11) {
    // Down
    if (square / 8 < 7 && !board[square + 8]) {
      $(`#${square + 8}`).css({ background: "blue" })
      legalMoves.push(square + 8)
    }
    // Two Down
    if (Math.floor(square / 8) === 1 && !board[square + 16]) {
      $(`#${square + 16}`).css({ background: "blue" })
      legalMoves.push(square + 16)
    }
    // Down Left
    if (square / 8 < 7 && square % 8 > 0 && boardTeam[square + 7] === "Black") {
      $(`#${square + 7}`).css({ background: "blue" })
      legalMoves.push(square + 7)
    }
    // Down Right
    if (square / 8 > 1 && square % 8 < 7 && boardTeam[square + 9] === "Black") {
      $(`#${square + 9}`).css({ background: "blue" })
      legalMoves.push(square + 9)

    }
  // Black and White Bishop
  } else if (type === 2 || type === 12) {
    // Up Left
    while (possibleMove % 8 > 0) {
      possibleMove -= 9
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      console.log("Pushing " + possibleMove)
      legalMoves.push(possibleMove)
      if (possibleMove < 8 || boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Up Right
    while (possibleMove % 8 < 7) {
      possibleMove -= 7;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove < 8 || boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Down Left
    while (possibleMove % 8 > 0) {
      possibleMove += 7;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove > 55 || boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Down Right
    while (possibleMove % 8 < 7) {
      possibleMove += 9;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove > 55 || boardTeam[possibleMove] === opposite) {
        break;
      }
    }

    // Black and White Knight
  } else if (type === 3 || type === 13) {
    // 8 Moves
    // -17, -15, -10, -6, 6, 10, 15, 17
    // Up Left
    if (boardTeam[square - 17] !== turn && square % 8 > 0 && square / 8 > 2) {
      $(`#${square - 17}`).css({ background: "blue" })
      legalMoves.push(square - 17)
    }
    // Up Right
    if (boardTeam[square - 15] !== turn && square % 8 < 7 && square / 8 > 2) {
      $(`#${square - 15}`).css({ background: "blue" })
      legalMoves.push(square - 15)
    }
    // Left Up
    if (boardTeam[square - 10] !== turn && square % 8 > 1 && square / 8 > 1) {
      $(`#${square - 10}`).css({ background: "blue" })
      legalMoves.push(square - 10)
    }
    // Right Up
    if (boardTeam[square - 6] !== turn && square % 8 < 6 && square / 8 > 1) {
      $(`#${square - 6}`).css({ background: "blue" })
      legalMoves.push(square - 6)
    }
    // Left Down
    if (boardTeam[square + 6] !== turn && square % 8 > 1 && square / 8 < 7) {
      $(`#${square + 6}`).css({ background: "blue" })
      legalMoves.push(square + 6)
    }
    // Right Down
    if (boardTeam[square + 10] !== turn && square % 8 < 6 && square / 8 < 7) {
      $(`#${square + 10}`).css({ background: "blue" })
      legalMoves.push(square + 10)
    }
    // Down Left
    if (boardTeam[square + 15] !== turn && square % 8 > 0 && square / 8 < 6) {
      $(`#${square + 15}`).css({ background: "blue" })
      legalMoves.push(square + 15)
    }
    // Down Right
    if (boardTeam[square + 17] !== turn && square % 8 < 7 && square / 8 < 6) {
      $(`#${square + 17}`).css({ background: "blue" })
      legalMoves.push(square + 17)
    }
  // Black and White Castles
  } else if (type === 4 || type === 14) {
    // Up
    while (possibleMove >= 8) {
      possibleMove -= 8;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Down
    while (possibleMove <= 55) {
      possibleMove += 8;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Left
    while (possibleMove > square - (square % 8)) {
      possibleMove -= 1;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Right
    while (possibleMove < square + (7 - square % 8)) {
      possibleMove += 1;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (boardTeam[possibleMove] === opposite) {
        break;
      }
    }

  // Black and White King
  } else if (type === 5 || type === 15) {
    // Top Left
    if (boardTeam[square - 9] !== turn && square % 8 > 0 && square > 8) {
      $(`#${square - 9}`).css({ background: "blue" })
      legalMoves.push(square - 9)
    }
    // Top Center
    if (boardTeam[square - 8] !== turn && square > 8) {
      $(`#${square - 8}`).css({ background: "blue" })
      legalMoves.push(square - 8)
    }
    // Top Right
    if (boardTeam[square - 7] !== turn && square % 8 < 7 && square > 8) {
      $(`#${square - 7}`).css({ background: "blue" })
      legalMoves.push(square - 7)
    }
    // Center Left
    if (boardTeam[square - 1] !== turn && square % 8 > 0) {
      $(`#${square - 1}`).css({ background: "blue" })
      legalMoves.push(square - 1)
    }
    // Center Right
    if (boardTeam[square + 1] !== turn && square % 8 < 7) {
      $(`#${square + 1}`).css({ background: "blue" })
      legalMoves.push(square + 1)
    }
    // Bottom Left
    if (boardTeam[square + 7] !== turn && square / 8 < 7 && square % 8 > 0) {
      $(`#${square + 7}`).css({ background: "blue" })
      legalMoves.push(square + 7)
    }
    // Bottom Center
    if (boardTeam[square + 8] !== turn && square / 8 < 7) {
      $(`#${square + 8}`).css({ background: "blue" })
      legalMoves.push(square + 8)
    }
    if (boardTeam[square + 9] !== turn && square / 8 < 7 && square % 8 < 7) {
      $(`#${square + 9}`).css({ background: "blue" })
      legalMoves.push(square + 9)
    }
  // Black and White Queen
  } else if (type === 6 || type === 16) {
    // Up Left
    while (possibleMove % 8 > 0) {
      possibleMove -= 9
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove < 8 || boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Up Right
    while (possibleMove % 8 < 7) {
      possibleMove -= 7;
      if (boardTeam[possibleMove] === turn) {
        console.log("2")
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove < 8 || boardTeam[possibleMove] === opposite) {
        console.log("1")
        break;
      }
    }
    possibleMove = square;
    // Down Left
    while (possibleMove % 8 > 0) {
      possibleMove += 7;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove > 55 || boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Down Right
    while (possibleMove % 8 < 7) {
      possibleMove += 9;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (possibleMove > 55 || boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Up
    while (possibleMove >= 8) {
      possibleMove -= 8;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Down
    while (possibleMove <= 55) {
      possibleMove += 8;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Left
    while (possibleMove > square - (square % 8)) {
      possibleMove -= 1;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (boardTeam[possibleMove] === opposite) {
        break;
      }
    }
    possibleMove = square;
    // Right
    while (possibleMove < square + (7 - square % 8)) {
      possibleMove += 1;
      if (boardTeam[possibleMove] === turn) {
        break;
      }
      $(`#${possibleMove}`).css({ background: "blue" })
      legalMoves.push(possibleMove)
      if (boardTeam[possibleMove] === opposite) {
        break;
      }
    }
  }
}