System.register(["angular2/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var NavigationAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            NavigationAppComponent = (function () {
                function NavigationAppComponent(zone) {
                    this.monuments = [];
                    this.zone = zone;
                    this.obtenirMonuments("REF", "");
                }
                NavigationAppComponent.prototype.obtenirMonuments = function (searchBy, inpSearch) {
                    if (!searchBy)
                        searchBy = "";
                    if (!inpSearch)
                        inpSearch = "";
                    // A changer en fonction de la page ou on est
                    var start = "0";
                    var length = "12";
                    var url = 'http://localhost:1337/?searchBy=' + searchBy + '&search=' + inpSearch + '&start=' + start + "&length=" + length;
                    var component = this;
                    $.ajax({
                        url: url,
                        dataType: 'json',
                        type: "GET",
                        success: function (res, statut) {
                            component.zone.run(function () {
                                component.monuments = res;
                            });
                        },
                        error: function (resultat, statut, erreur) {
                            console.log(resultat);
                        }
                    });
                };
                NavigationAppComponent = __decorate([
                    core_1.Component({
                        selector: 'navig_app'
                    }),
                    core_1.View({
                        templateUrl: './app/navigation/navigation.html',
                        styleUrls: ['./app/navigation/navigation.css']
                    }), 
                    __metadata('design:paramtypes', [core_1.NgZone])
                ], NavigationAppComponent);
                return NavigationAppComponent;
            }());
            exports_1("NavigationAppComponent", NavigationAppComponent);
        }
    }
});
//# sourceMappingURL=navigation_app.component.js.map