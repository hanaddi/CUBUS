//submit1

function Validasi(x,y,z){
	var self = {
		 x : x
		,y : y
		,z : z
		,val : []
		,test : {}
	};

	this.val=n=>{
		(self.val).push(n);
	}


	this.importTest=n=>{
		//console.log(n);
		try{
			n = JSON.parse(n);

			//front
			self.test.f= {}
			for(var a=0;a<self.x;a++){
				for(var b=0;b<self.z;b++){
					self.test.f[a+"_"+b]={c:null, i:null};
					for(var c=self.y-1;c>=0;c--){
						var d;
						if( (d  = n[a+"_"+c+"_"+b]) && d.t!="prop"  ){
							if( d.t!="glass") self.test.f[a+"_"+b].i=(self.y-c+1);
							self.test.f[a+"_"+b].c=d.c;
							//break;
						}
					}

				}
			}

			//right
			self.test.r= {}
			for(var a=0;a<self.y;a++){
				for(var b=0;b<self.z;b++){
					self.test.r[a+"_"+b]={c:null, i:null};
					for(var c=0;c<self.x;c++){
						var d;
						if( (d  = n[c+"_"+a+"_"+b]) && d.t!="prop" ){
							if( d.t!="glass" ) self.test.r[a+"_"+b].i=(c+1);
							self.test.r[a+"_"+b].c=d.c;
							//break;
						}
					}
				}
			}

			//top
			self.test.t= {}
			for(var a=0;a<self.x;a++){
				for(var b=0;b<self.y;b++){
					self.test.t[a+"_"+b]={c:null, i:null};
					for(var c=0;c<self.z;c++){
						var d;
						if( (d  = n[a+"_"+b+"_"+c]) && d.t!="prop"){
							if( d.t!="glass" ) self.test.t[a+"_"+b].i=(c+1);
							self.test.t[a+"_"+b].c=d.c;
							//break;
						}
					}
				}
			}
			//console.log(self.test.t);

			//console.log(self.test.f);
			//console.log(n);

		}catch(e){
			//console.log(e);
		}
	}

	this.submit_test = function(p,c){
		var x1,x2,y1,y2;
		switch(p){
			case "f" : var y1=self.z-1,y2=-1,x1=0,x2=self.x;break;	//front
			case "r" : var y1=self.z-1,y2=-1,x1=0,x2=self.y;break;	//right
			case "t" : var y1=self.y-1,y2=-1,x1=0,x2=self.x;break;	//top
		}

		var t = "";

		for(var b=y1;b!=y2;b+=y1>y2?-1:1){
			var r = "r";
			for(var a=x1;a!=x2;a+=x1>x2?-1:1){
				var d = "d";
				switch(c){
					case "s" : d += self.test[p][a+"_"+b].i ?1:0; break;			//shadow
					case "c" : d += self.test[p][a+"_"+b].c ||"ffffff"; break;			//color
				}
				

				r += d;
			}
			t += r;
		}
		return t;
	}

	this.submit_target=i=>{
		var x1,x2,y1,y2;
		switch(self.val[i].p){
			case "f" : var y1=self.z-1,y2=-1,x1=0,x2=self.x;break;	//front
			case "r" : var y1=self.z-1,y2=-1,x1=0,x2=self.y;break;	//right
			case "t" : var y1=self.y-1,y2=-1,x1=0,x2=self.x;break;	//top
		}

		var t = "";

		for(var b=y1;b!=y2;b+=y1>y2?-1:1){
			var r = "r";
			for(var a=x1;a!=x2;a+=x1>x2?-1:1){
				var d = "d";
				switch(self.val[i].t){
					case "s" : d += self.val[i][a+"_"+b]?1:0;break;			//shadow
					case "c" : d += self.val[i][a+"_"+b]||"ffffff";break;			//color
				}

				r += d;
			}
			t += r;
		}

		return t;
	}

	this.submit_all = function(){
		for(i in self.val){
			if( this.submit_target(i) != this.submit_test(self.val[i].p, self.val[i].t) ){
				//console.log( this.submit_target(i) );
				//console.log( this.submit_test(self.val[i].p, self.val[i].t) )
				return false;
			}
		}
		return true;
	}

}


handlers.onTest = function(args){
	var id = args.id;
	var benda = args.benda;

	// Get the user's read only data
	var userData = server.GetUserReadOnlyData(
	{
		PlayFabId: currentPlayerId,
		Keys: []
	});

	try{
		var task = JSON.parse(userData.tasks)[id].Value;
		var validasi = new Validasi(task.panjangSisi, task.panjangSisi, task.tinggiSisi);
		for(var i of task.val ){
			validasi.val(i);
		}
		validasi.importTest(benda);
		if(validasi.submit_all()){
			return {result : "true"};
		}else{
			return {result : "false"};
		}

	}catch(e){
		return {result : "error "+e};
	}
}
