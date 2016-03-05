var AllPosts = "";

var MainPage = $("#main-page");
var ErrorPage = $("#error-page");

var QuotePage = $("#quote-page");
var Quote = $("#quote");
var QuoteTitle = $("#quote-title");
var QuoteFrom = $("#quote-from");

var PostOverview = $("#posts-overview");
var PostPage = $("#post-page");
var PostTitle = $("#post-title");
var PostBody = $("#post-body");

var AboutPage = $("#about-content");
var PortfolioPage = $("#portfolio-content");

var TreasurePage = $("#treasure-content");
var GameScreen = $("#GameScreen");
var TreasureScreen = $("#TreasureScreen");

var BackToBlogButton = $("#backToBlogButton");
var BackToGameButton = $("#backToGameButton");

var GlobalGameRunning = false;
var DestinedPath = false;

function NavigateToNewPage(PageName)
{
	var CurrentPath = window.location.pathname;
	if(CurrentPath != PageName)
	{	
		window.history.pushState("object or string", "Title", PageName);
	}

	if(PageName == '/')
	{
		MainPage.hide();
		QuotePage.show();
	}
	else
	{
		QuotePage.hide();
		MainPage.show();

		PostOverview.hide();
		PostPage.hide();
		AboutPage.hide();
		PortfolioPage.hide();
		TreasurePage.hide();

		switch(PageName)
		{
			case "/blog":
			PostOverview.show();
			GlobalGameRunning = false;
			break;

			case "/about":
			DestinedPath = true;
			AboutPage.show();
			GlobalGameRunning = false;
			break;

			case "/portfolio":
			PortfolioPage.show();
			GlobalGameRunning = false;
			break;
			
			case "/treasure":
			DestinedPath = true;			
			NewGame();
			GlobalGameRunning = true;
			TreasurePage.show();
			TreasureScreen.hide();
			BackToGameButton.hide();
			GameScreen.show();
			Gameloop();
			break;
		}
	}
}

(function() 
{
	/*
	$.getJSON("anecdotes.json", function(data)
	{	
		var length = Object.keys(data).length;

		var Rand = Math.floor((Math.random() * length) + 1);
		var RandomAnecdote = data[Rand];

		Quote.html(RandomAnecdote.text);
		QuoteTitle.html(RandomAnecdote.title);
		QuoteFrom.html('- ' + RandomAnecdote.from);

		if(Quote.text().length > 450)
		{
			Quote.css('font-size', '18px');
			Quote.css('line-height', '26px');
		}
	});

	$.getJSON("posts.json", function(data)
	{	
		AllPosts = data;
	});	

	var Path = window.location.pathname;
	NavigateToNewPage(Path)
	*/
})();

function ShowPost(ID)
{
	var Post = AllPosts[ID];

	PostTitle.html(Post.title);
	PostBody.html(Post.body);

	PostOverview.hide();
	BackToBlogButton.show();
	PostPage.show();
}

window.onpopstate = function() 
{
	var Path = window.location.pathname;
	NavigateToNewPage(Path)
};

var AboutBox = new hit_box(95, 630, 60, 100);
var BlogBox = new hit_box(230, 450, 165, 75);
var PortfolioBox = new hit_box(590, 580, 100, 70);
var ChestBox = new hit_box(1020, 710, 50, 50);

function HandleCanvasClick(Position)
{
	if(InsideBox(BlogBox, Position))
	{
		DestinedPath = false;
		NavigateToNewPage('/blog');
	}
	else if(InsideBox(AboutBox, Position))
	{
		DestinedPath = true;
		NavigateToNewPage('/about');
	}
	else if(InsideBox(PortfolioBox, Position))
	{
		DestinedPath = false;
		NavigateToNewPage('/portfolio');
	}
	else if(DestinedPath && InsideBox(ChestBox, Position))
	{
		DestinedPath = true;
		NavigateToNewPage('/treasure');
	}
}

function WinGame()
{
	GameScreen.hide();
	TreasureScreen.show();
	BackToGameButton.show();
}
