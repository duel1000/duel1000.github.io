var TopCanvas = document.getElementById('topCanvas');

var TopCanvasWidth = 1229;
var TopCanvasHeight = 800;

TopCanvas.width = TopCanvasWidth;
TopCanvas.height = TopCanvasHeight;

var TopContext = TopCanvas.getContext('2d');
var TopImage = new Image();

var BackgroundFog = new Image();
BackgroundFog.src = "assets/images/repeatablefog.png";
var BackgroundRocks = new Image();
BackgroundRocks.src = "assets/images/backgroundRocks.png";
var BackgroundRocksHeight = 108;

var CaveImage = new Image();
CaveImage.src = "assets/images/cave.png";
var Cave = new low_entity(540,560);

var FlagImage = new Image();
FlagImage.src = "assets/images/Flag.png";
var Flag = new low_entity(220,445);

var SmokeParticleImage = new Image();
SmokeParticleImage.src = "assets/images/cloudparticle1.png";
CloudParticleWidth = 128;
CloudParticleHeight = 112;

var VolcanoSmokeEmitter = new Emitter(156, new v2(565,415));
var CloudEmitter1 = new Emitter(32, new v2(800, 280));
var CloudEmitter2 = new Emitter(32, new v2(900, 300));
var CloudEmitter3 = new Emitter(32, new v2(950, 320));
var Cloud1Image = new Image();
Cloud1Image.src = "assets/images/cloud1.png";
var Cloud2Image = new Image();
Cloud2Image.src = "assets/images/cloud2.png";
var Cloud3Image = new Image();
Cloud3Image.src = "assets/images/cloud3.png";

var VolcanoImage = new Image();
VolcanoImage.src = "assets/images/volcano.png";
var Volcano = new low_entity(190,390);

var MoonImage = new Image();
MoonImage.src = "assets/images/moon.png";
var Moon = new low_entity(870, 110);

var MoonlightImage1 = new Image();
var MoonlightImage2 = new Image();
var MoonlightImage3 = new Image();
MoonlightImage1.src = "assets/images/Moonlight1.png";
MoonlightImage2.src = "assets/images/Moonlight2.png";
MoonlightImage3.src = "assets/images/Moonlight3.png";
var MoonlightEmitter = new Emitter(32, new v2(1050,410));

var ManImage = new Image();
ManImage.src = "assets/images/man.png";
var Man = new low_entity(95,628);

var Heart = new expanding_entity(120,665, "assets/images/heart.png", 0.39);

var ChestImage = new Image();
ChestImage.src = "assets/images/chest.png";
var Chest = new Particle(new v2(1000, 710));
Chest.Alpha = 0;

var Star1 = new expanding_entity(350, 80, "assets/images/star1.png", 0.95);
Star1.Image.width = 75;

var Star2 = new expanding_entity(250, 130, "assets/images/star2.png", 0.5);
Star2.Image.width = 80;

var Star3 = new expanding_entity(420, 200, "assets/images/star3.png", 0.7);
Star3.Image.width = 55;

var Star4 = new expanding_entity(150, 300, "assets/images/star2.png", 0.95);
Star4.Image.width = 50;

var Star5 = new expanding_entity(290, 300, "assets/images/star2.png", 0.5);
Star5.Image.width = 75;

var VulcanoSmokeSpawnInterval = 0;
var Rotator = 1;
var MoonlightSpawnInterval = 0;
function DrawStarBundle(Context, Star1, Star2, Star3)
{
    	Rotator = (Rotator + 0.009) % 359;
	if(Rotator == 0)
	{
		Rotator = 1;
	}

	ChangeStarWidth(Star1);
	ChangeStarWidth(Star2);
	ChangeStarWidth(Star3);

	Context.save();
	
	Context.translate(Star1.Position.X, Star1.Position.Y);

	var StarWidth = Star1.Image.width * Star1.SizeModifier;
    	var HalfStarWidth = StarWidth / 2;
    	
    	Context.rotate(Rotator*Math.PI/180);
	Context.drawImage(Star1.Image, -HalfStarWidth, -HalfStarWidth, 
			       StarWidth, StarWidth);
	
	StarWidth = Star2.Image.width * Star2.SizeModifier;
    	HalfStarWidth = StarWidth / 2;
    	Context.drawImage(Star2.Image, -HalfStarWidth, -HalfStarWidth, 
			       StarWidth, StarWidth);

    	StarWidth = Star3.Image.width * Star3.SizeModifier;
    	HalfStarWidth = StarWidth / 2;
    	Context.drawImage(Star3.Image, -HalfStarWidth, -HalfStarWidth, 
			       StarWidth, StarWidth);

	Context.restore();
}

function SimulateVolcanoSmoke(Context)
{
	VulcanoSmokeSpawnInterval++;
	if(VulcanoSmokeSpawnInterval % 40 == 0)
	{
		VulcanoSmokeSpawnInterval = RandomNumberBetween(0, 25);

		var Particle = VolcanoSmokeEmitter.Particles[VolcanoSmokeEmitter.NextParticle++];
		Particle.Live = true;
		Particle.Phasing = true;
		Particle.Size = 0.1;
		var xOffset = RandomNumberBetween(-5, 40);
		Particle.Position.X = VolcanoSmokeEmitter.Position.X + xOffset;
		Particle.Position.Y = VolcanoSmokeEmitter.Position.Y;
		
		if(VolcanoSmokeEmitter.NextParticle >= VolcanoSmokeEmitter.ParticleAmount)
		{
			VolcanoSmokeEmitter.NextParticle = 0;
		}
	}

	for(var x = 0; x < VolcanoSmokeEmitter.ParticleAmount; x++)
	{
		var Particle = VolcanoSmokeEmitter.Particles[x];

		var Phase1Limit = TopCanvasHeight*2/6;
		var Phase2Limit = TopCanvasHeight / 5;
		var Phase3Limit = TopCanvasHeight / 12;

		var xSlower = 148;
		var ySlower = 360;

		var xDif = 0;
		var yDif = 0;

		if(Particle.Live)
		{ 	
			
			if(Particle.Position.Y > Phase1Limit && Particle.Phasing)
			{
				if(x % 2 == 2)
				{
					Particle.Size += 1/2000;
				}
				else
				{
					Particle.Size += 1/1800;	
				}
				xDif = RandomNumberBetween(-5, 25) / xSlower;
				yDif = RandomNumberBetween(0, 140) / ySlower;
			}
			else if(Particle.Position.Y > Phase2Limit && Particle.Phasing)
			{
				Particle.Size += 1/5000;
				if(x % 2 == 0)
				{
					xDif = RandomNumberBetween(-5, 60) / xSlower;
					yDif = RandomNumberBetween(-20, 110) / ySlower;
				}
				else
				{
					xDif = RandomNumberBetween(-5, 40) / xSlower;
					yDif = RandomNumberBetween(-20, 120) / ySlower;	
				}
			}
			else
			{
				Particle.Size += 1/10000;
				Particle.Phasing = false;
				xDif = RandomNumberBetween(-10, 60) / xSlower;

				if(x % 6 == 0)
				{
					yDif = RandomNumberBetween(-5, 5) / ySlower;
				}
				else if(x % 5 == 0)
				{
					yDif = RandomNumberBetween(0, 20) / ySlower;				
				}
				else if(x % 4 == 0)
				{
					if(Particle.Position.Y > Phase3Limit)
					{
						xDif = RandomNumberBetween(-5, 15) / xSlower;
						yDif = RandomNumberBetween(0, 45) / ySlower;
					}
					else
					{
						yDif = RandomNumberBetween(-10, 15) / ySlower;				
					}
				}
				else if(x % 3 == 0)
				{
					yDif = RandomNumberBetween(0, 15) / ySlower;
				}
				else
				{
					yDif = RandomNumberBetween(-20, 10) / ySlower;	
				}
			}
			

			Particle.Position.X = Particle.Position.X - xDif;
			Particle.Position.Y = Particle.Position.Y - yDif;

			if(Particle.Position.Y < -50)
			{
				Particle.Live = false;
			}

			Context.drawImage(SmokeParticleImage, Particle.Position.X, Particle.Position.Y, 
						CloudParticleWidth * Particle.Size, CloudParticleHeight * Particle.Size);
		}
	}
}

var CloudSpawnCounter = 0;
function SimulateCloudEmitter(Context, Emitter, ParticleImage)
{
	if(!DestinedPath)
	{
		CloudSpawnCounter++;
	}

	if(CloudSpawnCounter > 50)
	{
		CloudSpawnCounter = RandomNumberBetween(0,30);

		var Particle = Emitter.Particles[Emitter.NextParticle++];
		if(Emitter.NextParticle >= Emitter.ParticleAmount)
		{
			Emitter.NextParticle = 0;
		}	

		Particle.Live = true;
		Particle.Phasing = false;
		Particle.Size = RandomNumberBetween(5,10) / 10;
		Particle.Alpha = 0;
		var xOffset = RandomNumberBetween(-50, 50);
		var yOffset = RandomNumberBetween(-50, 50);
		Particle.Position.X = Emitter.Position.X + xOffset;
		Particle.Position.Y = Emitter.Position.Y + yOffset;
	}

	var Amount = Emitter.ParticleAmount;
	for(var i = 0; i < Amount; i++)
	{
		var Particle = Emitter.Particles[i];

		if(Particle.Live)
		{	
			if(DestinedPath)
			{
				Particle.Phasing = true;
			}

			Particle.Position.X -= 0.1;
			Particle.Position.Y -= 0.04;
			Particle.Size += 0.0005;

			if(Particle.Alpha < 1.0 && !Particle.Phasing)
			{
				Particle.Alpha += 0.007;
			}
			else if(Particle.Phasing)
			{
				Particle.Alpha -= 0.003;
				if(Particle.Alpha < 0.1)
				{
					Particle.Live = false;
				}
			}
			else
			{
				Particle.Phasing = true;
			}

			Context.globalAlpha = Particle.Alpha;
			Context.drawImage(ParticleImage, Particle.Position.X, Particle.Position.Y, 
						200 * Particle.Size, 120 * Particle.Size);			
			Context.globalAlpha = 1.0;
		}
	}
}

function DrawHitBox(Context, HitBox)
{
	Context.fillStyle = "#123456";
	Context.fillRect(HitBox.Position.X, HitBox.Position.Y, HitBox.Width, HitBox.Height);
}

function SimulateHeart(Context, Heart)
{
	Heart.SizeModifier += 0.001;
	if(Heart.SizeModifier > 0.45 && Heart.Expanding)
	{
		Heart.SizeModifier = 0.43;
		Heart.Expanding = false;
	}
	else if(Heart.SizeModifier > 0.45 && !Heart.Expanding)
	{
		Heart.SizeModifier = Heart.StartingSizeModifier;
		Heart.Expanding = true;	
	}

	var HeartHeight = Heart.Image.height * Heart.SizeModifier;
	var HeartWidth = Heart.Image.width * Heart.SizeModifier;

	var Offset = Heart.SizeModifier * 7;
	Context.drawImage(Heart.Image, Heart.Position.X - Offset , Heart.Position.Y - Offset, HeartWidth, HeartHeight);	
}

function VolcanoLoop()
{
	TopContext.fillStyle = "#000000";
	TopContext.fillRect(0 ,0 ,TopCanvasWidth, TopCanvasHeight);

	TopContext.drawImage(BackgroundFog, 0 ,0);

	if(DestinedPath && Chest.Alpha < 0.6)
	{
		Chest.Alpha += 0.001;
	}	
	else if(!DestinedPath && Chest.Alpha >= 0)
	{
		Chest.Alpha -= 0.03;
		if(Chest.Alpha < 0)
		{
			Chest.Alpha = 0;
		}
	}

	TopContext.globalAlpha = Chest.Alpha;
	TopContext.drawImage(ChestImage, Chest.Position.X , Chest.Position.Y, 80, 56);
	TopContext.globalAlpha = 1.0;

	TopContext.drawImage(BackgroundRocks, 0 , TopCanvasHeight - BackgroundRocksHeight);
	
	//TopContext.drawImage(TopImage, 0 ,0);

	TopContext.drawImage(MoonImage, Moon.X ,Moon.Y);

	DrawStarBundle(TopContext, Star1, Star2, Star3);
	DrawStarBundle(TopContext, Star2, Star3, Star4);
	DrawStarBundle(TopContext, Star3, Star4, Star5);
	DrawStarBundle(TopContext, Star4, Star5, Star1);
	DrawStarBundle(TopContext, Star5, Star1, Star2);

	SimulateVolcanoSmoke(TopContext);

	SimulateCloudEmitter(TopContext, CloudEmitter1, Cloud1Image);
	SimulateCloudEmitter(TopContext, CloudEmitter2, Cloud2Image);
	SimulateCloudEmitter(TopContext, CloudEmitter3, Cloud3Image);
	
	TopContext.drawImage(VolcanoImage, Volcano.X, Volcano.Y);
	TopContext.drawImage(ManImage, Man.X ,Man.Y, ManImage.width/2, ManImage.height/2);

	MoonlightSpawnInterval++;

	if(MoonlightSpawnInterval > 40)
	{
		MoonlightSpawnInterval = 0;	
		
		var Particle = MoonlightEmitter.Particles[MoonlightEmitter.NextParticle++];
		if(MoonlightEmitter.NextParticle >= MoonlightEmitter.ParticleAmount)
		{
			MoonlightEmitter.NextParticle = 0;	
		}
		Particle.Live = true;
		Particle.Alpha = 0.1;
		Particle.Phasing = false;
		var RandomOffsetX = RandomNumberBetween(-100, 100);
		var RandomOffsetY = RandomNumberBetween(-100, 100);
		Particle.Position.X = MoonlightEmitter.Position.X + RandomOffsetX;
		Particle.Position.Y = MoonlightEmitter.Position.Y + RandomOffsetY;
	}

	for(var i = 0; i < MoonlightEmitter.ParticleAmount; i++)
	{
		var Particle = MoonlightEmitter.Particles[i];

		if(!DestinedPath)
		{
			Particle.Phasing = true;
		}

		if(Particle.Live)
		{
			if(Particle.Phasing)
			{
				Particle.Alpha -= 0.005;
				if(Particle.Alpha < 0.1)
				{
					Particle.Live = false;
				}
			}
			else if(!Particle.Phasing)
			{
				Particle.Alpha += 0.002;
				if(Particle.Alpha > 1.0)
				{
					Particle.Alpha = 1.0;
					Particle.Phasing = true;
				}
			}

			TopContext.globalAlpha = Particle.Alpha;

			if(i % 3 == 0)
			{
				Particle.Position.X += 0.01;
				Particle.Position.Y += 0.06;
				TopContext.drawImage(MoonlightImage1, Particle.Position.X , Particle.Position.Y);
			}
			else if(i % 2 == 0)
			{
				Particle.Position.X -= 0.01;
				Particle.Position.Y += 0.05;
				TopContext.drawImage(MoonlightImage2, Particle.Position.X , Particle.Position.Y);	
			}
			else 
			{
				Particle.Position.X += 0.01;
				Particle.Position.Y -= 0.01;
				TopContext.drawImage(MoonlightImage3, Particle.Position.X , Particle.Position.Y);
			}
		}			
	}
	TopContext.globalAlpha = 1.0;

	TopContext.drawImage(CaveImage, Cave.X, Cave.Y);
	TopContext.drawImage(FlagImage, Flag.X, Flag.Y);

	SimulateHeart(TopContext, Heart);
	
	//DrawHitBox(TopContext, BlogBox);
	//DrawHitBox(TopContext, AboutBox);
	//DrawHitBox(TopContext, PortfolioBox);
	//DrawHitBox(TopContext, ChestBox);
	
	requestAnimationFrame(VolcanoLoop);
}


TopImage.onload = function() 
{
	VolcanoLoop();
};
TopImage.src = "assets/images/background.png";