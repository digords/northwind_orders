sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/Component",
    "sap/ui/core/UIComponent"
], function (
    Controller,
    History,
    Component,
    UIComponent
) {
    "use strict";

    return Controller.extend("dig.demo.northwind.orders.orders.controller.Base", {
        /**
         * @override
         */
        onInit: function () {
            Controller.prototype.onInit.apply(this, arguments);


        },

        /**
         * @override
         */
        onBeforeRendering: function () {
            Controller.prototype.onBeforeRendering.apply(this, arguments);


        },

        /**
         * @override
         */
        onAfterRendering: function () {
            Controller.prototype.onAfterRendering.apply(this, arguments);


        },
        /**
         * @override
         */
        onExit: function () {
            Controller.prototype.onExit.apply(this, arguments);


        },

        getRouter: function () {
            UIComponent.getRouterFor(this);
        },

        onNavBack: function () {
            if (History.getInstance().getPreviousHash() !== undefined)
                window.history.go(-1);
            else
                this.getRouter().navTo("home", {}, true);
        }
    });
});