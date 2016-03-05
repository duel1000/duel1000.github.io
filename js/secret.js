var c = document.getElementById("canvas");
var CanvasWidth = 168;
var CanvasHeight = CanvasWidth;
var TileSize = CanvasWidth / 4;
c.width = CanvasWidth;
c.height= CanvasHeight;

var ctx = c.getContext("2d");
var MovesUsedElement = $("#movesUsed");
var MOVES_LEFT = 0;
var GAME_KEY = 1;

var Grid = [];

var WHITE = 0;
var BLACK = 1;
var GREY = 2;

var CurrentLevel = 1;

var Player;
var Player2;

function player(x, y, color)
{
	this.x = x;
	this.y = y;
	this.size = 22;
	this.color = color;
}

function CreateGameBoard(Key)
{
	switch(Key)
	{
		case 1:
			Grid[1][0] = BLACK;
			Grid[2][1] = BLACK;
			Grid[0][2] = BLACK;
			Grid[3][3] = BLACK;
			Player = new player(1,1, BLACK);
			Player2 = new player(2,3, BLACK);
		break;

		case 2:
			Grid[3][0] = BLACK;
			Grid[1][1] = BLACK;
			Grid[0][2] = BLACK;
			Grid[2][3] = BLACK;
			Player = new player(1,2, BLACK);
			Player2 = new player(3,1, BLACK);
		break;

		case 3:
			Grid[1][0] = BLACK;
			Grid[3][1] = BLACK;
			Grid[2][2] = BLACK;
			Grid[0][3] = BLACK;
			Player = new player(2,1, BLACK);
			Player2 = new player(0,2, BLACK);
		break;

		case 4:
			Grid[0][0] = BLACK;
			Grid[3][1] = BLACK;
			Grid[1][2] = BLACK;
			Grid[2][3] = BLACK;
			Player = new player(2,2, BLACK);
			Player2 = new player(1,0, BLACK);
		break;
	}
}

function NewGame()
{
	MOVES_LEFT = 40;
	GAME_KEY = Math.floor(Math.random() * 4) + 1;
	MovesUsedElement.text(MOVES_LEFT);
	CurrentLevel = 1;
	InitializeGame();
}

function InitializeGame()
{
	Grid = [];
	for(var x = 0; x < 4; x++) 
	{
		Grid.push([]);
		for(var y = 0; y < 4; y++)
		{
			Grid[x].push(0);
		}	
	};

	CreateGameBoard(GAME_KEY);
}

function DrawPlayer(Player, Context)
{
	if(Player.color == BLACK)
	{
		ctx.fillStyle = "#000000";
	}
	else
	{
		ctx.fillStyle = "#FFFFFF";	
	}
	Context.fillRect(Player.x * TileSize + (Player.size/2), Player.y * TileSize + (Player.size/2), Player.size, Player.size);
}

//var CurrentAlpha = 1.0;
//var DeltaAlpha = 0.01;

function Render()
{
	/*if(CurrentAlpha >= 1.0 || CurrentAlpha <= -1.0)
	{
		DeltaAlpha = -DeltaAlpha;
	}

	CurrentAlpha += DeltaAlpha;
	ctx.globalAlpha = CurrentAlpha;*/

	ctx.fillStyle = "#000000";
	ctx.fillRect(0 ,0 ,CanvasWidth, CanvasHeight);		

	ctx.fillRect(63, 0, 2, CanvasWidth);
	ctx.fillRect(127, 0, 2, CanvasWidth);
	ctx.fillRect(191, 0, 2, CanvasWidth);

	ctx.fillRect(0, 63, CanvasHeight, 2);
	ctx.fillRect(0, 127, CanvasHeight, 2);
	ctx.fillRect(0, 191, CanvasHeight, 2);
	
	for(var x = 0; x < 4; x++)
	{
		for(var y = 0; y < 4; y++)
		{
			if(Grid[x][y] == WHITE)
			{
				ctx.fillStyle = "#FFFFFF";
				ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);
			}
			else if(Grid[x][y] == BLACK)
			{
				ctx.fillStyle = "#000000";
				ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);	
			}
			else
			{
				ctx.fillStyle = "#383838";
				ctx.fillRect(x * TileSize, y * TileSize, TileSize, TileSize);	
			}
		}
	}

	DrawPlayer(Player, ctx);

	if(CurrentLevel == 3)
	{
		DrawPlayer(Player2, ctx);	
	}
}

function CheckWinCondition()
{
	var WhiteBlocks = 0;
	var BlackBlocks = 0;
	for(var x = 0; x < 4; x ++)
	{
		for(var y = 0; y < 4; y++)
		{
			var GridValue = Grid[x][y]; 
			if(GridValue == WHITE)
			{
				WhiteBlocks++;
			}
			else if(GridValue == BLACK)
			{
				BlackBlocks++;
			}
		}
	}

	if(WhiteBlocks == 16 || BlackBlocks == 16)
	{
		CurrentLevel++;
		InitializeGame();
		
		if(CurrentLevel > 3)
		{
			WinGame();
		}
	}

	if(MOVES_LEFT < 1)
	{
		GlobalGameRunning = false;
	}
}

var keystate = {};

function MoveEvent(Direction)
{
	if(Direction == 'left')
	{
		keystate[37] = true;
	}
	else if(Direction == 'up')
	{
		keystate[38] = true;	
	}
	else if(Direction == 'right')
	{
		keystate[39] = true;	
	}
	else if(Direction == 'down')
	{
		keystate[40] = true;	
	}
}

document.addEventListener("keydown", function(event) 
{	
	if(GlobalGameRunning &&
	   (event.keyCode == 37 || 
	   event.keyCode == 38 ||
	   event.keyCode == 39 ||
	   event.keyCode == 40))
	{
		event.preventDefault();
	}

	keystate[event.keyCode] = true;
});

document.addEventListener("keyup", function(event) 
{
	delete keystate[event.keyCode];
});

function MovePlayer(Player, X, Y)
{
	if(X != 0)
	{
		Player.x += X;
		if(Player.x > 3)
		{
			Player.x = 0;
		}
		else if(Player.x < 0)
		{
			Player.x = 3;
		}
	}
	else if(Y != 0)
	{
		Player.y += Y;
		if(Player.y > 3)
		{
			Player.y = 0;
		}
		else if(Player.y < 0)
		{
			Player.y = 3;
		}
	}

}

var PlayerMoved = false;
function Gameloop()
{	
	if(keystate[39])
	{
		MovePlayer(Player, 1, 0);
		MovePlayer(Player2, 1, 0);
		PlayerMoved = true;
	}
	else if(keystate[37])
	{
		MovePlayer(Player, -1, 0);
		MovePlayer(Player2, -1, 0);
		PlayerMoved = true;
	}
	else if(keystate[40])
	{
		MovePlayer(Player, 0, 1);
		MovePlayer(Player2, 0, 1);
		PlayerMoved = true;
	}
	else if(keystate[38])
	{	
		MovePlayer(Player, 0, -1);
		MovePlayer(Player2, 0, -1);		
		PlayerMoved = true;
	}

	if(PlayerMoved)
	{	
		MOVES_LEFT -= 1;
		MovesUsedElement.text(MOVES_LEFT);
		
		var GroundColor = Grid[Player.x][Player.y];
		switch(CurrentLevel)
		{
			case 1:
				if(GroundColor == WHITE)
				{
					Grid[Player.x][Player.y] = BLACK;
					Player.color = WHITE;
				}
				else
				{
					Grid[Player.x][Player.y] = WHITE;
					Player.color = BLACK;	
				}
			break;
			
			case 2:
				if(GroundColor == WHITE)
				{
					Grid[Player.x][Player.y] = BLACK;
					Player.color = WHITE;
				}
				else if(GroundColor == BLACK)
				{
					Grid[Player.x][Player.y] = GREY;
					Player.color = BLACK;	
				}
				else
				{
					Grid[Player.x][Player.y] = WHITE;
					Player.color = BLACK;			
				}
			break;

			case 3:
				if(GroundColor == WHITE)
				{
					Grid[Player.x][Player.y] = BLACK;
					Player.color = WHITE;
				}
				else
				{
					Grid[Player.x][Player.y] = WHITE;
					Player.color = BLACK;	
				}
				
				var GroundColor2 = Grid[Player2.x][Player2.y];
				if(GroundColor2 == WHITE)
				{
					Grid[Player2.x][Player2.y] = BLACK;
					Player2.color = WHITE;
				}
				else
				{
					Grid[Player2.x][Player2.y] = WHITE;
					Player2.color = BLACK;	
				}
			break;

		}		

		CheckWinCondition();
		PlayerMoved = false;
		keystate = {};
	}

	Render();

	if(GlobalGameRunning)
	{
		requestAnimationFrame(Gameloop);
	}
	else
	{
		//Nothing - but thanks for looking :)
	}
}









