sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("dig.demo.northwind.orders.orders.controller.App", {

			//Lifecycle Event
			onInit: function () {
				this.oRouter = this.getOwnerComponent().getRouter();
				this.oRouter.attachRouteMatched(this.onRouteMatched, this);
			},

			onRouteMatched: function (oEvent) {
				this.currentRouteName = oEvent.getParameter("name");
				this.currentProduct = oEvent.getParameter("arguments").product;
				this.currentOrder = oEvent.getParameter("arguments").order;
			},

			onStateChanged: function (oEvent) {
				if (oEvent.getParameter("isNavigationArrow"))
					this.oRouter.navTo(this.currentRouteName, { product: this.currentProduct, order: this.currentOrder }, true);
			},

			//Lifecycle Event
			onExit: function () {
				this.oRouter.detachRouteMatched(this.onRouteMatched, this);
			}
		});
	});
