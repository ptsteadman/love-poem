$(document).ready(function(){

	function Poem(){
		this.complexity = 5016689;
		this.progress = 0;
		this.scrollListener(1, 2000);
		this.intervalListener(1, 2000);
		this.cities = cities;
		/*
		for(var i = 0; i < data['wantSentenceType'].length; i++){
			var elements = data['wantSentenceType'][i].value;
			elements = elements.split("|");
			var elementComplexity = 1;
			for(var j = 0; j < elements.length; j++){
				var element = elements[j];
				if(element == "@city"){
					elementComplexity *= this.cities.length;
				} else if( element.charAt(0) == "@" || element.charAt(0) == "~"){
					elementComplexity *= data[element].length;
				} 
			}
			this.complexity += elementComplexity;
		}
		*/
		for(dataType in data){
			this[dataType] = new WeightedArray(data[dataType]);
		}
		this.addSentences(Math.floor($(window).height()/ 50), 2000);
	}

	function WeightedArray(data){
		this.array = Array();
		var that = this;
		data.forEach(function(item){
			for(var i = 0; i < item.weight; i++){
				that.array.push(item.value);
			}
		});
	}

	WeightedArray.prototype = {
		choose: function(){
			return this.array[Math.floor(Math.random() * this.array.length)];
		} 
	}

	Poem.prototype = {
		scrollListener: function(n, fadeTime){
			var that = this;
			$(window).scroll(function(){
				if($(window).scrollTop() + $(window).height() > $(document).height() - 200){
					that.addSentences(Math.floor(n),fadeTime);
				}
			});
		},

		intervalListener: function(n, fadeTime){
			var that = this;
			setInterval(function(){
				if($(window).scrollTop() + $(window).height() > $(document).height() - 200){
					that.addSentences(Math.floor(n),fadeTime);
				}
			}, 500);

		},

		showPicture: function(time){
			var random = Math.random();
			if(random > .66){
				$("#image").css({"background":"url(img/1.jpg)","display":"block"});
			} else if(random > .33){
				$("#image").css({"background":"url(img/2.jpg)","display":"block"});
			} else {
				$("#image").css({"background":"url(img/3.jpg)","display":"block"});
			}
			setTimeout(function(){ $("#image").css("display","none"); },time);
		},

		addSentences: function(n, fadeTime){
			for(var i = 0; i < n; i++){
				if(this.progress == 50) alert("The probablity space of love is large but finite.");
				var sentence = this.sentence(this.sentenceType.choose());
				var size = 0;
				var time = 1;
				if(this.progress < 10){
					size = 1;
					time = 1;
				} else if (this.progress < 20){
					size = .9;
					time = 5;
	 			} else if (this.progress < 40){
					size = .85;
					time = 10;
				} else if (this.progress < 60){
					size = .75;
					time = 25;
				} else if (this.progress < 90){
					size = .7
					time = 40;
				} else if (this.progress < 120){
					size = .65;
					time = 80;
				} else if (this.progress < 140){
					size = .6;
					time = 120
				} else {
					time = 150
					size = .55
				}
				if(this.progress < 200 && this.progress % 20 == 0 ) this.showPicture(time);
				if(this.progress % 100 == 0 ) this.showPicture(time);
				$("<span>" + sentence + "</span>").css({"font-size": size + "em", "line-height": size + .1 + "em"}).hide().appendTo("#sentences").fadeIn(fadeTime);
				this.progress += 1;
				$("#progress").html("<span class='red'>" + this.progress + "</span> / <span class='blue'>" + this.complexity + "</span>");
				}
		},

		sentence: function(sentenceType){
			switch(sentenceType){
				case "loveSentence":
					return "I love you. &nbsp;"
					break;
				case "br":
					return "<br><br>"
					break;
				case "wantSentence":
					return this.wantSentence(this.wantSentenceType.choose()) + "&nbsp;&nbsp;";
					break;
			}
		},

		wantSentence: function(wantSentenceType){
			var elements = wantSentenceType.split("|");
			var string = "";
			for(var i = 0; i < elements.length; i++){
				var element = elements[i];
				if(element.charAt(0) == "@"){
					if(element == "@city"){
						string += this.displayCity(this.cities[Math.floor(Math.random() * this.cities.length)]);
					} else {
						var choice = this[element].choose();
						if("aeiouAEIOU".indexOf(choice.charAt(0)) != -1){
							string += "an " + choice;
						} else {
							string += "a " + choice;
						}
					}
				} else if (element.charAt(0) == "="){
					element = "@" + element.substring(1);
					string += this[element].choose();
				} else if (element.charAt(0) == "~"){
					string += this[element].choose();  
				} else {
					string += element;
				}
			}
			return string;
		},

		displayCity: function(c){
			return "<a target='_blank' href='http://en.wikipedia.org" + c.wiki_url + "'>" +  decodeURI(c.name) + ", " + c.state + "</a>";
		}

	}

	var poem = new Poem();

});