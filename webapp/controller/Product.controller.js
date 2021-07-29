sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "dig/demo/northwind/orders/orders/util/formatter"
], function (
    Controller,
    formatter
) {
    "use strict";

    return Controller.extend("dig.demo.northwind.orders.orders.controller.Product", {

        formatter: formatter,

        /**
         * @override
         */
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("product").attachPatternMatched(this.onProductMatched, this);
        },

        onProductMatched: function (oEvent) {
            this.oProduct = oEvent.getParameters().arguments.product;
            this.getView().bindElement({
                path: "/" + this.oProduct, parameters: { expand: "Category, Supplier" },
                events: {
                    dataRequested: function (oEvent) { this.getView().setBusy(true); }.bind(this),
                    dataReceived: function (oEvent) { this.getView().setBusy(false); }.bind(this),
                    change: function (oEvent) { console.log("Changed"); }
                }
            });
        }
    });
});