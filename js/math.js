function v2(X, Y)
{
	this.X = X;
	this.Y = Y;
}

function hit_box(X, Y, Width, Height)
{
	this.Position = new v2(X, Y);

	this.Width = Width;
	this.Height = Height;
}

function InsideBox(HitBox, Position)
{
	var Result = false;

	var MiddleOfBoxX = HitBox.Position.X + (HitBox.Width / 2);
	var MiddleOfBoxY = HitBox.Position.Y + (HitBox.Height / 2);
	var DistX = Math.abs(Position.X - MiddleOfBoxX);
	var DistY = Math.abs(Position.Y - MiddleOfBoxY); 

	if(DistX < HitBox.Width/2 && DistY < HitBox.Height/2)
	{
		Result = true;
	}

	return(Result);
}

function RandomNumberBetween(A, B)
{
	var Result = Math.floor(Math.random() * B) + A; 
	return(Result);
}