let player;
let floor;

let platforms = [];


function setup() { // Функция, которая вызывается автоматически один раз и инициализирует все значения
    createCanvas(800, 600); // Создаем полотно в 800 пикселей в ширину в 600 пикселей в высоту 
    frameRate(60); // Настраиваем обновление кадров fps на 60 кадров в секунду

    platforms.push({posX: 100, posY: height - 200, width: 40}, {posX: 250, posY: height - 250, width: 60});

    floor = {
        height: 100,
        color: color(10, 100, 10),

        drawFloor: function()
        {
            fill(this.color);
            // width, height - ширина и высота полотна(ширина в нашем случае 800, высота 600).
            // this.heigt - это обращение к свойству объекта, то есть обращаем к высоте floor 
            rect(0, height - this.height, width, this.height); 
        },
    }

    player =
    {
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        speedGravity: -5,
        color: color(200, 100, 20),
        grounded: false,
        
        drawPlayer: function()
        {
            fill(this.color); // Покрасим будущие фигуры в цвет, который мы задали внутри определяемого объекта
            rect(this.x, this.y, this.width, this.height);
        },

        jump: function()
        {
            this.speedGravity = 15;
            this.y -= this.speedGravity;
            this.grounded = false;
        },

        gravity: function(floor)
        {
            if (this.speedGravity > -5)
                this.speedGravity--;
            if(this.y + this.height < height - floor.height)
                this.y -= this.speedGravity;
            else
                this.grounded = true;
        },

        checkOutSide: function(){
            if (this.x < -10)
                this.x = width - this.width;
            if (this.x > width - 10)
                this.x = -10;
        },
        
        moveLeft: function() { this.x -= 4 },

        moveRight: function() { this.x += 4 },

        movement: function() 
        {
            if(this.grounded && keyIsDown(87))
                this.jump();
            if(keyIsDown(68))
                this.moveRight();
            if(keyIsDown(65))
                this.moveLeft();
        },
    }
}

function drawPlatforms()
{
    fill(0);
    for(let i = 0; i < platforms.length; i++)
        rect(platforms[i].posX - platforms[i].width / 2, platforms[i].posY, platforms[i].width, 20);
}
function draw()
{
    background(255);
    floor.drawFloor();
    drawPlatforms();
    player.drawPlayer();
    player.gravity(floor);
    player.movement();
    player.checkOutSide();
}

function keyPressed()
{
    console.log(key, keyCode);
}