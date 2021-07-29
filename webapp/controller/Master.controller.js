sap.ui.define([
	"sap/ui/core/mvc/Controller", "dig/demo/northwind/orders/orders/util/formatter"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, formatter) {
		"use strict";

		return Controller.extend("dig.demo.northwind.orders.orders.controller.Master", {

			formatter: formatter,

			onInit: function () {
				this._bDescending = false;
				this.oRouter = this.getOwnerComponent().getRouter();
			},

			onSearch: function (oEvent) {
				this.getView().byId("idTblCustomer").getBinding("items").filter([new sap.ui.model.Filter("ShipName", sap.ui.model.FilterOperator.Contains, oEvent.getParameter("query"))], "Application");
			},

			onAdd: function () {

			},

			onSort: function () {
				this._bDescending = !this._bDescending;
				this.getView().byId("idTblCustomer").getBinding("items").sort(new sap.ui.model.Sorter({ path: "OrderDate", descending: this._bDescending, group: function (oContext) { return oContext.getProperty("ShipName") } }));
			},

			onListPressItem: function (oEvent) {
				this.getView().getParent().getParent().setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);
				this.oRouter.navTo("detail", { order: oEvent.getSource().getBindingContext().getPath().split("/").slice(-1).pop() }, true);
				//this.oRouter.navTo("detail", { customer: oEvent.getSource().getBindingContext().getObject().CustomerID });
				//this.oRouter.navTo("detail", { layout: sap.f.LayoutType.TwoColumnsMidExpanded, customer: oEvent.getSource().getBindingContext().getObject().CustomerID });
			},

			getName: function (oContext) {
				return oContext.getProperty("ShipName");
			},

			getGroupHeader: function (oGroup) {
				return new sap.m.GroupHeaderListItem({ title: oGroup.key });
			}

		});
	});
