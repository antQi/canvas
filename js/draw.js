var circle = {
		context: null, //画布上下文
		data: null,//数据
		dian: Math.PI * 2 / 360,//将圆分成360等分，每份PI/180
		nexti: 0,//第几个半圆或圆
		timer: null,//定时器
		tempData: null,//当前半圆或圆的数据
		realEnd: 0,//整个圆或半圆的结束终点
		end: 0,//每次画圆的终点
		getNext: function() {//获取下一个半圆或圆的数据
			if (this.nexti < this.data.length) {
				return this.data[this.nexti];
			}
		},
		start: function() {//开始准备画圆
			this.tempData = this.data[this.nexti];
			if (this.tempData.direction) {
				this.realEnd = this.tempData.sAgenl - Math.abs(this.tempData.sAgenl - this.tempData.eAgenl);
				this.end = this.tempData.sAgenl - this.dian;
			} else {
				this.realEnd = this.tempData.sAgenl + Math.abs(this.tempData.sAgenl - this.tempData.eAgenl);
				this.end = this.tempData.sAgenl + this.dian;
			}
			this.timer = setInterval(this.draw, 7);
		},
		draw: function() {//每次画圆
			if ((!circle.tempData.direction && circle.end >= circle.realEnd) || (circle.tempData.direction && circle.end <= circle.realEnd)) {
				clearTimeout(circle.timer);
				circle.timer = null;
				circle.nexti++;
				if (!circle.getNext()) {
					return;
				}
				circle.tempData = circle.getNext();
				circle.start();
			}
			circle.context.beginPath();
			circle.context.moveTo(circle.tempData.x, circle.tempData.y);
			circle.context.arc(circle.tempData.x, circle.tempData.y, circle.tempData.r, circle.tempData.sAgenl, circle.end, circle.tempData.direction);
			circle.context.fillStyle = circle.tempData.color;
			circle.context.fill();
			circle.context.closePath();
			if (circle.tempData.direction) {
				circle.end -= circle.dian;
			} else {
				circle.end += circle.dian;
			}
		}
	}

	var ele = document.querySelector("#canvas");
	var context = ele.getContext("2d");
	//准备数据
	var data = [
	{x: 300,y: 300,	r: 150,	sAgenl: Math.PI * 3 / 2,eAgenl: Math.PI / 2,direction: false,color: 'white'},
	{x: 300,y: 300,	r: 150,	sAgenl: Math.PI / 2,eAgenl: Math.PI * 3 / 2,direction: false,color: 'black'},
	{x: 300,y: 150 + (150 / 2),	r: 150 / 2,	sAgenl: Math.PI * 3 / 2,eAgenl: Math.PI / 2,direction: false,color: 'black'},
	{x: 300,y: 300 + (150 / 2),	r: 150 / 2,	sAgenl: Math.PI * 3 / 2,eAgenl: Math.PI / 2,direction: true,color: 'white'},
	{x: 300,y: 300 + (150 / 2),	r: 10,sAgenl: 0,eAgenl: Math.PI * 2,direction: false,color: 'black'},
	{x: 300,y: 150 + (150 / 2),	r: 10,sAgenl: 0,eAgenl: Math.PI * 2,direction: false,color: 'white'}];

	//调用
	circle.context = context;
	circle.data = data;
	circle.start();
