//submit1

var cubus = {
	plastic :{
		"fill-opacity"        :1
		,"fill-rule"          :"evenodd"
		,"stroke"             :"#000000"
		,"stroke-width"       :0.5
		,"stroke-linecap"     :"round"
		,"stroke-linejoin"    :"round"
		,"stroke-miterlimit"  :4
		,"stroke-opacity"     :1
		,"X-cost"     		  :50
	},
	glass :{
		"fill-opacity"        :0.4
		,"fill-rule"          :"evenodd"
		,"stroke"             :"#111111"
		,"stroke-width"       :0.5
		,"stroke-linecap"     :"round"
		,"stroke-linejoin"    :"round"
		,"stroke-miterlimit"  :4
		,"stroke-opacity"     :1
		,"X-cost"     		  :100
	},
	prop :{
		"fill-opacity"        :0
		,"fill-rule"          :"evenodd"
		,"stroke"             :"#948f8b"
		,"stroke-width"       :2
		,"stroke-linecap"     :"round"
		,"stroke-linejoin"    :"round"
		,"stroke-miterlimit"  :4
		,"stroke-opacity"     :1
		,"X-cost"     		  :5
	},
	aim :{
		"fill"                :"#ff7700"
		,"fill-opacity"       :0.5
		,"fill-rule"          :"evenodd"
		,"stroke"             :"#948f8b"
		,"stroke-width"       :0
		,"stroke-linecap"     :"round"
		,"stroke-linejoin"    :"round"
		,"stroke-miterlimit"  :4
		,"stroke-opacity"     :1
		,"X-cost"     		  :0
	}
}


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

/*////////////////////


{
	"plastic_0000ff":-999 ,
	"plastic_ff0000":-999 ,
	"plastic_00ff00":-999 ,
	"glass_ff0000":-999 ,
	"plastic_ffffff":-999 ,
	"prop_0000ff" : 100
}

//**////////////////////////
handlers.reset = function(args){
	server.UpdateUserReadOnlyData(
	{
		PlayFabId: currentPlayerId,
		Data : {
			 "stats" : '{"money":100}'
			,"cubes" : '{"plastic_000000":100}'
			,"tasks" : '{"I3":{"id":"I3","judul":"RANDOM","reward":0,"panjangSisi":10,"tinggiSisi":10,"val":[{"p":"r","t":"s","0_0":2,"2_0":2,"1_1":2,"1_6":2,"1_5":2,"1_4":2,"1_3":2,"1_2":2},{"p":"f","t":"c","0_0":"ff0000","2_0":"00ff00","1_1":"0000ff"}]}}'
		}
	}
	);
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

	//try{
		var task = (tasks = JSON.parse(userData.Data.tasks.Value))[id];
		var validasi = new Validasi(task.panjangSisi, task.panjangSisi, task.tinggiSisi);
		for(var i of task.val ){
			validasi.val(i);
		}
		validasi.importTest(benda);
		if(validasi.submit_all()){

			var cubes = JSON.parse(userData.Data.cubes.Value);
			tasks[id] = null
			var stats = JSON.parse(userData.Data.stats.Value);
			benda = JSON.parse(benda);
			var reward = task.reward;
			for(var aa in benda){
				reward -= cubus[ benda[aa].t]["X-cost"];
				if(cubes[ benda[aa].t + "_" + benda[aa].c ]!=-999){
					cubes[ benda[aa].t + "_" + benda[aa].c ] -=1;
					if(cubes[ benda[aa].t + "_" + benda[aa].c ] <0){
						return {result : "false" ,"pesan" : "Not enough cube"};
					}
				}
			}


			stats.money = stats.money*1 + reward;
			stats = JSON.stringify(stats);
			cubes = JSON.stringify(cubes);
			tasks = JSON.stringify(tasks);

			server.UpdateUserReadOnlyData(
			{
				PlayFabId: currentPlayerId,
				Data : {
					 "stats" : stats
					,"cubes" : cubes
					,"tasks" : tasks
				}
			}
			);

			return {result : "true" ,"gain" : reward};
		}else{
			return {result : "false" ,"pesan" : ""};
		}

	//}catch(e){
	//	return {result : "error "+e};
	//}
}
