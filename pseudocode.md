# Pseudocode for Blendoku
MVP Game Setup 
* user selects a color tile
* user places color tile on the puzzle board
* puzzle solved when all color tiles are in the correct spot on the puzzle board

## Game Variables 
* _gameBoard_ = one array of arrays for the board
  * a grid 10/10 
  * indexs correlate to the html divs background color in RGB
* _guessedGameBoard()_ = a duplicate of the gameBoard but empty elements
* _colorTiles_ = one array of RGB values to place in the gameBoard
* _puzzleState_ = if the puzzle has been solved or not

## Event Listeners 
* _colorTile:_ select the color to put on the game board
* _gameBoard > divs:_ sets the background of the div to the colorTile previously selected
  * adds the rgb background of the selected colorTIle to the gameBoard
  * IF (gameBoard > div) HAS (background color) THEN (user can move the tile around on the board, unless it's a key tile) 

## Needed Functions 
* _init():_ initial game setup 
  * sets the final puzzle state
  * sets the gameBoard div (key colors, and empty spaces)
  * sets up and randomizes the color colorTiles to pick from 
* _render():_ 
  * to show the colorTile the user picked on the puzzle board where the user delegated it to go
  * update the board if the user chooses a div on the board to put in a different spot 
* _placeColorTile():_ stores the placement of the colorTile in the guessedGameBoard when placed on the board
* _checkForSolved():_ checks if the user has placed all the colorTiles in the correct position 

