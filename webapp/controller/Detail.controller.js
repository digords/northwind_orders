sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"dig/demo/northwind/orders/orders/util/formatter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,
		formatter,
		FilterOperator,
		Sorter) {
		"use strict";

		return Controller.extend("dig.demo.northwind.orders.orders.controller.Detail", {

			formatter: formatter,

			onInit: function () {
				this.oRouter = this.getOwnerComponent().getRouter();
				this.oRouter.getRoute("master").attachPatternMatched(this.onOrderMatched, this);
				this.oRouter.getRoute("detail").attachPatternMatched(this.onOrderMatched, this);
			},

			onExit: function () {
				this.oRouter.getRoute("master").detachPatternMatched(this.onOrderMatched, this);
				this.oRouter.getRoute("detail").detachPatternMatched(this.onOrderMatched, this);
			},

			onOrderMatched: function (oEvent) {
				this.oOrder = oEvent.getParameters().arguments.order;
				this.getView().bindElement({
					path: "/" + this.oOrder, parameters: { expand: "Customer, Employee, Order_Details, Shipper" },
					events: {
						dataRequested: function (oEvent) { this.getView().setBusy(true); }.bind(this),
						dataReceived: function (oEvent) { this.getView().setBusy(false); }.bind(this),
						change: function (oEvent) { console.log("Changed"); }
					}
				});
				this.fetchInvoices(this.oOrder);
			},

			onEditToggleButtonPress: function (oEvent) {
				let oObjectPage = this.getView().byId("ObjectPageLayout");

				if (!oObjectPage.getShowFooter())
					oEvent.getSource().setText("Cancel");
				else
					oEvent.getSource().setText("Edit");

				oObjectPage.setShowFooter(!oObjectPage.getShowFooter());
			},

			onProductPress: function (oEvent) {
				this.getView().getParent().getParent().setLayout(sap.f.LayoutType.ThreeColumnsEndExpanded);
				this.oRouter.navTo("product", { product: "Products(" + oEvent.getSource().getBindingContext().getPath().split("=").slice(-1).pop().substring(0, 1) + ")" });
				//				this.oRouter.navTo("product", { product: oEvent.getSource().getBindingContext().getPath().split("/").slice(-1).pop() });
			},

			fetchInvoices: function (iOrder) {
				let oTable = this.getView().byId("invoicesTable");

				let iOrd = iOrder.substring(iOrder.indexOf("(") + 1, iOrder.lastIndexOf(")"));

				oTable.getBinding("items").filter([new sap.ui.model.Filter("OrderID", sap.ui.model.FilterOperator.EQ, iOrd)]);
				oTable.getBinding("items").sort(new sap.ui.model.Sorter({ path: "OrderID", descending: false, group: function (oContext) { return oContext.getProperty("OrderID") } }))
			}
		});
	});
