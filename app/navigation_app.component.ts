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

	 constructor(zone:NgZone) {
	    this.zone = zone;

	    this.obtenirMonuments("REF", "");
  	}

	obtenirMonuments(searchBy, inpSearch)
	{
		if (!searchBy)
			searchBy = "";

		if (!inpSearch)
			inpSearch = "";

		// A changer en fonction de la page ou on est
		var start = "0";
		var length = "12";

		var url = 'http://localhost:1337/?searchBy='+searchBy+'&search='+inpSearch+'&start='+start+"&length="+length;

		var component = this;

		$.ajax({
			url : url,
			dataType : 'json',
			type: "GET",
			success : function(res, statut){
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
