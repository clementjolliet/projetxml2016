System.register(["angular2/platform/browser", "./monument/monument_app.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, monument_app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (monument_app_component_1_1) {
                monument_app_component_1 = monument_app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(monument_app_component_1.MonumentAppComponent);
        }
    }
});
//# sourceMappingURL=environment_main.js.map