class sprite{
	constructor(img, x, y, w, h, ){
		this.img = img;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	desenha(ctx){
		if(this.img){
			ctx.drawImage(this.img, this.x, this.y, this.w, this.h);	
		} else{
			ctx.fillRect(this.x, this.y, this.w, this.h);
		}	
	}

	
}

class animacao extends sprite{
	constructor(img, xA, yA, wA, hA, x, y, w, h){
		super(img, x, y, w, h);
		this. xA = xA;
		this. yA = yA;
		this. wA = wA;
		this. hA = hA;
	}

	animar(ctx){
		ctx.drawImage(this.img, this.xA, this.yA, this.wA, this.hA, this.x, this.y, this.w, this.h);
	}
}

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');


let imgPersonagem = new Image();
imgPersonagem.src = "spriteAnimado.png";

let imgBase = new Image();
imgBase.src = "base.png";

let imgPlat = new Image();
imgPlat.src = "plataforma.png";

let personagem = new animacao(imgPersonagem, 50, 0 , 50, 37, 125, 455, 50, 37);

let fundo = new sprite(null, 0, 0, 720, 560);

let obstaculos = [];
obstaculos.push(new sprite(null, 350, 335, 10, 20));
obstaculos.push(new sprite(null, 500, 485, 50, 50));

let bases = [];
for (let i = 0; i < 2; i++) {
	bases.push(new sprite(imgBase, (-22 + (i* 368)), 515, 380, 60));
}

let plataformas = [];
plataformas.push(new sprite(imgPlat, -20, 400, 142, 32));
plataformas.push(new sprite(imgPlat, 300, 355, 142, 32));

function desenhaJogo() {
	ctx.clearRect(0, 0, 720, 560);	
	carregaInicio();
}

function carregaInicio(){
	ctx.fillStyle = "lightblue";
	fundo.desenha(ctx);
	personagem.animar(ctx);
	ctx.fillStyle = "black";
	for(let i = 0; i < obstaculos.length; i++){
		obstaculos[i].desenha(ctx);
	}
	for(let i = 0; i < bases.length; i++){
		bases[i].desenha(ctx);
	}	
	for(let i = 0; i < plataformas.length; i++){
		plataformas[i].desenha(ctx);
	}
}

canvas.addEventListener('mousemove', (e) => {
	personagem.x = e.offsetX;
	personagem.y = e.offsetY;
	desenhaJogo();
})

window.addEventListener('load', () => {
	carregaInicio();
})
