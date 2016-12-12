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

	constructor(zone:NgZone) {
	    this.zone = zone;

	    this.start = 1;
	    this.length = 12;

	    this.obtenirMonuments("REF", "");
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
		if (!searchBy)
			searchBy = "";

		if (!inpSearch)
			inpSearch = "";

		this.searchBy = searchBy;
		this.inpSearch = inpSearch;

		var url = 'http://localhost:1337/?searchBy='+searchBy+'&search='+inpSearch+'&start='+this.start+"&length="+this.length;

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
}
