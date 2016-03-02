function Particle(Position)
{
	this.Position = Position;
	this.Live = false;
	this.Phasing = false;
	this.Size = 0.1;

	this.Alpha = 1.0;
}

function Emitter(ParticleAmount, BasePosition)
{
	this.Particles = [];
	this.ParticleAmount = ParticleAmount;
	this.Position = new v2(BasePosition.X, BasePosition.Y);

	for(var i = 0; i < ParticleAmount; i++)
	{
		var Position = new v2(BasePosition.X, BasePosition.Y);
		var NewParticle = new Particle(Position);
		this.Particles.push(NewParticle);
	}

	this.NextParticle = 0;
}

function low_entity(X, Y)
{
	this.X = X;
	this.Y = Y;
}

function expanding_entity(X, Y, ImagePath, StartingSizeModifier)
{
	this.Position = new v2(X, Y);

	this.Image = new Image();
	this.Image.src = ImagePath;
	
	this.StartingSizeModifier = StartingSizeModifier;
	this.SizeModifier = StartingSizeModifier;
	this.Expanding = true;
}

function ChangeStarWidth(Star)
{
	if(Star.Expanding)
	{
		Star.SizeModifier += 0.001;
		if(Star.SizeModifier > 1.0)
		{
			Star.Expanding = false;
		}
	}
	else
	{
		Star.SizeModifier -= 0.001;
		if(Star.SizeModifier < 0.5)
		{
			Star.Expanding = true;
		}
	}
}







