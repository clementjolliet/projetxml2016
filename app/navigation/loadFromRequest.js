$(document).ready(function(){
	
	monuments = null;

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
	var length = "12";

	var url = 'http://localhost:1337/?searchBy='+searchBy+'&search='+inpSearch+'&start='+start+"&length="+length

	$.ajax({
		url : url,
		dataType : 'json',
		type: "GET",
		success : function(res, statut){
			monuments = res;

			for (var i=0; i<monuments.length; i++)
			{
				$('#listeMonuments ul').append('<li><img src="https://images.busit.com/apps/6_100.png"><span>Email</span><div>Wololo</div></li>');
	        }
		},
		error : function(resultat, statut, erreur){

			console.log(resultat);
       	}
	});
}