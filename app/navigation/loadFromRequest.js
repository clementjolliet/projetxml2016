$(document).ready(function(){
	
	monuments = null;

});

$("#listeMonuments").ready(function(){
	afficheMonuments();
	console.log(JSON.stringify(monuments));
});

function afficheMonuments()
{
	var searchBy = $('#searchBy').val();
	var inpSearch = $('#inpSearch').val();

	if (!searchBy)
		searchBy = "";

	if (!inpSearch)
		inpSearch = "";

	// A changer en fonction de la page ou on est
	var start = "0";
	var length = "20";

	var url = 'http://localhost:1337/?searchBy='+searchBy+'&search='+inpSearch+'&start='+start+"&length="+length

	$.ajax({
		url : url,
		dataType : 'json',
		type: "GET",
		success : function(res, statut){
			monuments = res;

			// A partir de l'array monuments, afficher les resultats
			console.log(JSON.stringify(monuments));
		},
		error : function(resultat, statut, erreur){

			console.log(resultat);
       	}
	});
}