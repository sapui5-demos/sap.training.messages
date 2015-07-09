sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/resource/ResourceModel",
   "sap/ui/model/odata/v2/ODataModel",
   "sap/ui/model/json/JSONModel"
], function(UIComponent, ResourceModel, ODataModel, JSONModel) {
	"use strict";
	return UIComponent.extend("sap.training.messages.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// set i18n model
			var i18nModel = new ResourceModel({
				bundleName: "sap.training.messages.i18n.i18n"
			});
			this.setModel(i18nModel, "i18n");

			// set product model - remote
			var mAppData = this.getMetadata().getManifestEntry("sap.app");
			var sServiceUrl = mAppData.dataSources.demoService.uri;
			var oProductModel = new ODataModel(sServiceUrl);
			this.setModel(oProductModel, "product");

		}
	});
});