export class Crystalization {
	template = `<div class="crystalization">
					<div class="crystalization__glow"></div>
					<div class="crystalization__overlay"></div>
					<canvas class="crystalization__canvas"></canvas>
				</div>`

	createHTML(selector: string): void {
		let el = <HTMLElement>document.querySelector(selector);
		el.insertAdjacentHTML('afterbegin', this.template);

		if (selector !== 'body') {
			let wrapper = <HTMLElement>el.querySelector('.crystalization');
			el.style.position = 'relative';
			wrapper.style.position = 'absolute';
		}
	}

	init(selector = 'body'): void {
		this.createHTML(selector);

		var canvas = <HTMLCanvasElement>document.querySelector(".crystalization__canvas");
		var ctx = canvas.getContext("2d");
		var bgg = <HTMLElement>document.querySelector(".crystalization__glow");
		var w = ctx.canvas.width = window.innerWidth;
		var h = ctx.canvas.height = window.innerHeight;
		
		window.onresize = function () {
			w = ctx.canvas.width = window.innerWidth;
			h = ctx.canvas.height = window.innerHeight;
			maxHeight = h * .9
			minHeight = h * .5;
			dots = [];
			pushDots();
			ctx.globalCompositeOperation = "lighter";
		};
		
		// document.querySelector("body").addEventListener("click", function() {
		// 	hue = Math.random() * 360;
		// 	bgg.style.background = "radial-gradient(ellipse at center, hsla(" + hue + ",50%,50%,.8) 0%,rgba(0,0,0,0) 100%)";
		// 	dots = [];
		// 	pushDots();
		// })
		
		var dots = [];
		var md = 100;
		var maxWidth = 15;
		var minWidth = 2;
		var maxHeight = h * .9
		var minHeight = h * .5;
		var maxSpeed = 35;
		var minSpeed = 6;
		var hue = 230;
		var hueDif = 50; // Hue +/-
		var glow = 0; // 10; // Turn this off for better performance
		ctx.globalCompositeOperation = "lighter";
		
		function pushDots() {
			for (let i = 1; i < md; i++) {
				dots.push({
					x: Math.random() * w,
					y: Math.random() * h / 2,
					h: Math.random() * (maxHeight - minHeight) + minHeight,
					w: Math.random() * (maxWidth - minWidth) + minWidth,
					c: Math.random() * ((hue + hueDif) - (hue - hueDif)) + (hue - hueDif),
					m: Math.random() * (maxSpeed - minSpeed) + minSpeed
				});
			}
		};
		
		function render() {
			ctx.clearRect(0, 0, w, h);

			for (let i = 1; i < dots.length; i++) {
				ctx.beginPath();
				const grd = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[i].x + dots[i].w, dots[i].y + dots[i].h);
				grd.addColorStop(.0, "hsla(" + dots[i].c + ",50%,50%,.0)");
				grd.addColorStop(.2, "hsla(" + dots[i].c + 20 + ",50%,50%,.5)");
				grd.addColorStop(.5, "hsla(" + dots[i].c + 50 + ",70%,60%,.8)");
				grd.addColorStop(.8, "hsla(" + dots[i].c + 80 + ",50%,50%,.5)");
				grd.addColorStop(1., "hsla(" + (dots[i].c + 100) + ",50%,50%,.0)");
				ctx.shadowBlur = glow;
				ctx.shadowColor = "hsla(" + (dots[i].c) + ",50%,50%,1)";
				ctx.fillStyle = grd;
				ctx.rect(dots[i].x, dots[i].y, dots[i].w, dots[i].h);
				ctx.fill();
				ctx.closePath();
				dots[i].x += dots[i].m / 100;
				if (dots[i].x > w + maxWidth) {
					dots.splice(i, 1);
					dots.push({
						x: 0,
						y: Math.random() * h,
						h: Math.random() * (maxHeight - minHeight) + minHeight,
						w: Math.random() * (maxWidth - minWidth) + minWidth,
						c: Math.random() * ((hue + hueDif) - (hue - hueDif)) + (hue - hueDif),
						m: Math.random() * (maxSpeed - minSpeed) + minSpeed
					});
				}
			} window.requestAnimationFrame(render);
		}
		
		bgg.style.background = "radial-gradient(ellipse at center, hsla(" + hue + ",50%,50%,.8) 0%,rgba(0,0,0,0) 100%)";

		pushDots();
		render();
	}

	destroy() {
		document.querySelector('.crystalization').remove()
	}
}
