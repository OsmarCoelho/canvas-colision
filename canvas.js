const LARGURA = 720;
const ALTURA = 560;

class sprite{
	constructor(img, xA, yA, wA, hA, x, y, w, h){
		this.img = img;
		this. xA = xA;
		this. yA = yA;
		this. wA = wA;
		this. hA = hA;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	get centro(){
		return {
			x : this.x + this.w/2,
			y : this.y + this.h/2
		}
	}

	desenha(ctx){
		if(this.img){
			ctx.drawImage(this.img, this.xA, this.yA, this.wA, this.hA, this.x, this.y, this.w, this.h);	
		} else{
			ctx.fillRect(this.x, this.y, this.w, this.h);
		}	
	}

	colide(colisor){
		let a = Math.abs(colisor.centro.x - this.centro.x);
		let b = Math.abs(colisor.centro.y - this.centro.y);
		let d = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
		let r1 = this.h/2;
		let r2 = colisor.h/2;
		if(d <= r1 + r2){
			return true;
		} else{
			return false;
		}

	}
}

class mob extends sprite{
	constructor(img, xA, yA, wA, hA, x, y, w, h){
		super(img, 0, 0, w, h, x, -20, w, h);
		this.velocidade = -5 * Math.random() -1;
	}

	atualizaMob(){
		this.y = this.y - this.velocidade;
		if(this.y + this.h > ALTURA){
			this.y = 0;
			this.x = Math.random() * 700;
		}
	}
}

class personagem extends sprite{
	constructor(img, xA, yA, wA, hA, x, y, w, h){
		super(img, xA, yA, wA, hA, x, y, w, h);
		this.tiros = [];
	}

	tiro(){
		this.tiros.push(new sprite(null, 0, 0, 2, 2, this.x + this.h/3, this.y, 2, 2));
	}

	atualizaTiro(){
		for(tiro of this.tiros){
			tiro.y -= 5;
		}
	}
	
	destroiTiro(tiro){
		if(tiro.y + tiro.h < 0){
			this.tiros.splice(this.tiros.indexOf(tiro), 1);
		}
	}
}

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let s = 0;

let imgPersonagem = new Image();
imgPersonagem.src = "corre.png";
let per = new personagem(imgPersonagem, 0, 0 , 50, 37, 125, 495, 50, 37);

let imgBase = new Image();
imgBase.src = "base.png";

let imgPlat = new Image();
imgPlat.src = "plataforma.png";


let fundo = new sprite(null, 0, 0, 720, 560, 0, 0, 720, 560);

let obstaculos = [];
obstaculos.push(new mob(null, 0, 0, 10, 20, Math.random() * LARGURA, -20, 20, 20));
obstaculos.push(new mob(null, 0, 0, 10, 20, Math.random() * LARGURA, -20, 20, 20));
obstaculos.push(new mob(null, 0, 0, 10, 20, Math.random() * LARGURA, -20, 20, 20));
obstaculos.push(new mob(null, 0, 0, 10, 20, Math.random() * LARGURA, -20, 20, 20));
obstaculos.push(new mob(null, 0, 0, 10, 20, Math.random() * LARGURA, -20, 20, 20));


let bases = [];
for (let i = 0; i < 2; i++) {
	bases.push(new sprite(imgBase, 0, 0, 380, 60, (-22 + (i* 368)), 515, 400, 60));
}

let aux = 0;
function corre(){
	if(per.x > aux){
		imgPersonagem.src = "corre.png";
		per.img = imgPersonagem;
		per.xA = per.xA + 50;
		if(per.xA >= 300){
			per.xA = 0;
		}
	}else if(per.x < aux){
		imgPersonagem.src = "correInvertido.png";
		per.img = imgPersonagem;
		per.xA = per.xA + 50;
		if(per.xA >= 300){
			per.xA = 0;
		}
	}
	aux = per.x;	
}

function detectaColisao(){
	for(obstaculo of obstaculos){
		obstaculo.desenha(ctx);
		obstaculo.atualizaMob();
		const atingiu = obstaculo.colide(per);
		if(atingiu == true){
			obstaculo.x = -20;
		}
		for(tiro of per.tiros){
			const atingiu = obstaculo.colide(tiro);
			if(atingiu == true){
				obstaculo.x = -20;
				per.destroiTiro(tiro);
			}	
		}
	}
}

function atualizaInimigo(){
	ctx.fillStyle = "black";
	for(obstaculo of obstaculos){
		obstaculo.desenha(ctx);
		obstaculo.atualizaMob();
	}
}

function atualizaJogador(){
	per.desenha(ctx);
	canvas.addEventListener('mousemove', (e) => {
		per.x = e.offsetX - per.w/2;
		corre();
	})
	document.addEventListener('click', (e) => {		
		imgPersonagem.src = "tiro.png";
		per.img = imgPersonagem;
		per.xA = 0;
		per.tiro();
	})
}

function atualizaTiros(){
	for(tiro of per.tiros){
		tiro.desenha(ctx);
		per.destroiTiro(tiro);
	}
	per.atualizaTiro();
}

function desenhaJogo(){	
	ctx.clearRect(0, 0, 720, 560);	
	ctx.fillStyle = "lightblue";
	fundo.desenha(ctx);
	atualizaInimigo();		
	atualizaJogador();
	atualizaTiros();	
	detectaColisao();
	for(base of bases){
		base.desenha(ctx);
	}	
}

window.setInterval(()=>{
	desenhaJogo();
}, 33);