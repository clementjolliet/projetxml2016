import {Component, View, NgZone} from "angular2/core";

@Component({
   selector: 'navig_app'
})

@View({
	templateUrl: './app/monument/monument.html',
        styleUrls: ['./app/monument/monument.css']
})

export class MonumentAppComponent {
	
	public monument = { "REF" : "PA00078023", "ETUD" : "Recensement immeubles MH", "REG" : "Champagne-Ardenne", "DPT" : "10", "COM" : "Avant-lès-Ramerupt", "INSEE" : "10021", "TICO" : "Eglise Saint-Denis", "ADRS" : null, "STAT" : "propriété de la commune", "AFFE" : null, "PPRO" : "Eglise (cad. C 81) : classement par arrêté du 16 juillet 1984", "DPRO" : "1984/07/16 : classé MH", "AUTR" : null, "SCLE" : "12e siècle ; 16e siècle" };
	public zone;

	constructor(zone:NgZone) {
	    this.zone = zone;
            //this.monument = JSON.stringify(this.monument, null, 4); 
  	}
        
        creerProfil(){
            
        }
}
