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
    var MonumentAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MonumentAppComponent = (function () {
                function MonumentAppComponent(zone) {
                    this.monument = { "REF": "PA00078023", "ETUD": "Recensement immeubles MH", "REG": "Champagne-Ardenne", "DPT": "10", "COM": "Avant-lès-Ramerupt", "INSEE": "10021", "TICO": "Eglise Saint-Denis", "ADRS": null, "STAT": "propriété de la commune", "AFFE": null, "PPRO": "Eglise (cad. C 81) : classement par arrêté du 16 juillet 1984", "DPRO": "1984/07/16 : classé MH", "AUTR": null, "SCLE": "12e siècle ; 16e siècle" };
                    this.zone = zone;
                    //this.monument = JSON.stringify(this.monument, null, 4); 
                }
                MonumentAppComponent.prototype.creerProfil = function () {
                };
                MonumentAppComponent = __decorate([
                    core_1.Component({
                        selector: 'navig_app'
                    }),
                    core_1.View({
                        templateUrl: './app/monument/monument.html',
                        styleUrls: ['./app/monument/monument.css']
                    }), 
                    __metadata('design:paramtypes', [core_1.NgZone])
                ], MonumentAppComponent);
                return MonumentAppComponent;
            }());
            exports_1("MonumentAppComponent", MonumentAppComponent);
        }
    }
});
//# sourceMappingURL=monument_app.component.js.map