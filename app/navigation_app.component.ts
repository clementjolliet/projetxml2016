import {Component, View, NgZone} from "angular2/core";

@Component({
   selector: 'navig_app'
})

@View({
	templateUrl: './app/navigation/navigation.html',
   styleUrls: ['./app/navigation/navigation.css']
})

export class NavigationAppComponent {
	
	public monuments = [];
	public zone;
	public start;
	public length;
	public searchBy;
	public inpSearch;

	public display = "liste";
	public monument = { "REF" : "", "ETUD" : "", "REG" : "", "DPT" : "", "COM" : "", "INSEE" : "", "TICO" : "", "ADRS" : "", "STAT" : "", "AFFE" : "", "PPRO" : "", "DPRO" : "", "AUTR" : "", "SCLE" : "", "IMG" : "", "LAT" : "48.866667", "LONG" : "2.333333"};
	public radius = 40;
	
	constructor(zone:NgZone) {
	    this.zone = zone;

	    this.start = 1;
	    this.length = 12;

	    this.obtenirMonuments("REF", "");

	    initialisation(this.monument['LAT'], this.monument['LONG']);
  	}

  	pagePlus()
  	{
  		this.start = this.start + this.length;

  		this.obtenirMonuments(this.searchBy, this.inpSearch);
  	}

  	pageMoins()
  	{
  		this.start = this.start - this.length;
  		if (this.start == 0)
  			this.start = 0;

  		this.obtenirMonuments(this.searchBy, this.inpSearch);
  	}

	obtenirMonuments(searchBy, inpSearch)
	{
		this.afficherListe();

		if (!searchBy)
			searchBy = "";

		if (!inpSearch)
			inpSearch = "";

		this.searchBy = searchBy;
		this.inpSearch = inpSearch;

		var url = 'http://localhost:1337/api/getMonuments?searchBy='+searchBy+'&search='+inpSearch+'&start='+this.start+"&length="+this.length;

		var component = this;

		$.ajax({
			url : url,
			dataType : 'json',
			type: "GET",
			success : function(res, statut){
				if (res == "null")
					res = [];

				component.zone.run(() => {
					component.monuments = res;
	    		});
			},
			error : function(resultat, statut, erreur){

				console.log(resultat);
	       	}
		});
	}

	afficherMonument(reference)
	{
		var component = this;

		for (var i=0; i<this.monuments.length; i++)
		{
			if (this.monuments[i]['REF'] == reference)
			{
				component.zone.run(() => {
					this.monument = this.monuments[i];
					initialisation(this.monument['LAT'], this.monument['LONG']);
	    		});
			}
		}

		component.zone.run(() => {
			this.display = "monument";
	    });
	}

	afficherListe()
	{
		var component = this;
		
		component.zone.run(() => {
			this.display = "liste";
			initialisation('48.866667', '2.3333333');
		});
                $("#s").hide();
                $("#les_btns").hide();
	}

	afficherStats(typeStat)
	{
		var component = this;
		
		component.zone.run(() => {
			this.display = "stats";
			initialisation('48.866667', '2.3333333');
                        
		});

		//var url = 'http://localhost:1337/api/getStats?searchBy=regions';
                var url = 'http://localhost:1337/api/getStats?searchBy=' + typeStat;
		var component = this;

                var libelle = {"regions" : "Affichage des régions", "departements" : "Affichage des départements"};

		$.ajax({
			url : url,
			dataType : 'json',
			type: "GET",
			success : function(res, statut){
				
				var lesKeys = new Array();
				var lesData = new Array();
				for (var i=0; i<res.length; i++)
				{
					lesKeys.push(res[i]["data"]);
					lesData.push(parseInt(res[i]["nombre"]));
				}

				initGraph(libelle[typeStat], lesKeys, lesData);
				$("#s").show();
                                $("#les_btns").show();
			},
			error : function(resultat, statut, erreur){

				console.log(resultat);
	       	}
		});

        $("#EmplacementDeMaCarte").hide();
	}
}
