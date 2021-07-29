sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"dig/demo/northwind/orders/orders/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/HashChanger"
], function (UIComponent,
	Device,
	models,
	JSONModel,
	HashChanger) {
	"use strict";

	return UIComponent.extend("dig.demo.northwind.orders.orders.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			HashChanger.getInstance().replaceHash("");

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});
