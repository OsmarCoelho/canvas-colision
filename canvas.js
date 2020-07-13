const LARGURA = 720;
const ALTURA = 560;
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

class mob extends sprite/*animacao*/{
	/*constructor(img, xA, yA, wA, hA, x, y, w, h){
		super(img, xA, yA, wA, hA, x, y, w, h);
		this.velocidade = -4 * Math.random() -1;
	}*/
	constructor(img, x, y, w, h){
		super(img, LARGURA, Math.random() *(ALTURA - 60 - h), w, h);
		this.velocidade = -5 * Math.random() -1;
	}

	atualizaMob(){
		this.x = this.x + this.velocidade;
		if(this.x + this.w < 0){
			this.x = LARGURA;
			this.y = Math.random() *(ALTURA - 60 - this.h);
		}
	}
}

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let s = 0;

let imgPersonagem = new Image();
imgPersonagem.src = "tiro.png";
let personagem = new animacao(imgPersonagem, 0, 0 , 50, 37, 125, 490, 50, 37);

let imgBase = new Image();
imgBase.src = "base.png";

let imgPlat = new Image();
imgPlat.src = "plataforma.png";


let fundo = new sprite(null, 0, 0, 720, 560);

let obstaculos = [];
obstaculos.push(new mob(null, 350, 335, 10, 20));
obstaculos.push(new mob(null, 500, 485, 50, 50));

let bases = [];
for (let i = 0; i < 2; i++) {
	bases.push(new sprite(imgBase, (-22 + (i* 368)), 515, 380, 60));
}

let plataformas = [];
plataformas.push(new sprite(imgPlat, -20, 400, 142, 32));
plataformas.push(new sprite(imgPlat, 300, 355, 142, 32));

function corre(e){
	if(e.key.toLowerCase() == "arrowright"){
		setInterval(()=>{
			imgPersonagem.src = "corre.png";
			personagem.img = imgPersonagem;
			personagem.xA += 50;
			if(personagem.xA >= 300){
				personagem.xA = 0;
			}
		}, 66)
		personagem.x += 1;
		if(personagem.x + personagem.w > LARGURA){
			personagem.x = 0;
		}
	} else if(e.key.toLowerCase() == "arrowleft"){
		setInterval(()=>{
			imgPersonagem.src = "correInvertido.png";
			personagem.img = imgPersonagem;
			personagem.xA += 50;
			if(personagem.xA >= 300){
				personagem.xA = 0;
			}
			personagem.x += 1;
			if(personagem.x + personagem.w > LARGURA){
				personagem.x = 0;
			}
		}, 66)
	}
	parado();
	
}
function atira(){
	imgPersonagem.src = "tiro.png";
	personagem.img = imgPersonagem;
	for(let i = 0; i < 4; i++){
		setTimeout(() => {
			personagem.xA = 50 * i;
			if(personagem.xA >= 200){
				personagem.xA = 0;
			}
		}, 132);
	}
	

}
function pula(){
	imgPersonagem.src = "pulo.png";
	personagem.img = imgPersonagem;
	personagem.xA = 0;
}
function parado(){
	imgPersonagem.src = "tiro.png";
	personagem.img = imgPersonagem;
	personagem.xA = 0;
}

function desenhaJogo() {
	ctx.clearRect(0, 0, 720, 560);	
	ctx.fillStyle = "lightblue";
	fundo.desenha(ctx);
	personagem.animar(ctx);
	ctx.fillStyle = "black";
	for(let i = 0; i < obstaculos.length; i++){
		obstaculos[i].desenha(ctx);
		obstaculos[i].atualizaMob();
	}
	for(let i = 0; i < bases.length; i++){
		bases[i].desenha(ctx);
	}	
	for(let i = 0; i < plataformas.length; i++){
		plataformas[i].desenha(ctx);
	}
	document.body.addEventListener('keydown', (e) => {
		if(e.key.toLowerCase() == "arrowright"){
			corre(e);
		} else if(e.key.toLowerCase() == "arrowleft"){
			corre(e);
		} else if (e.key.toLowerCase() == "arrowup"){
			pula();
		} else if(e.key.toLowerCase() == " "){
			atira();
		}
	})
}

window.setInterval(()=>{
	desenhaJogo();
} , 132);
