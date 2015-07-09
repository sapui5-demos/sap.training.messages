sap.ui.controller("sap.training.messages.view.Main", {

	onInit: function() {

		var oMsgTypes = {
			"msgTypes": [
				{
					"key": "Error",
					"text": "Error"
				},
				{
					"key": "Information",
					"text": "Information"
				},
				{
					"key": "None",
					"text": "None"
				},
				{
					"key": "Success",
					"text": "Success"
				},
				{
					"key": "Warning",
					"text": "Warning"
				},
	          ]
		}

		var oView = this.getView();

		oView.setModel(new sap.ui.model.json.JSONModel(oMsgTypes), "msgTypes");
		oView.setModel(new sap.ui.model.json.JSONModel(), "input");

		//var oInput = oView.byId("productIdInput");
		//sap.ui.getCore().getMessageManager().registerObject(oInput, true);
	},

	onCreateUIMessage: function(oEvent) {

		var oView = this.getView();
		var oInputData = oView.getModel("input").getData();

		var oMessageManager = sap.ui.getCore().getMessageManager();
		var oMessageProcessor = new sap.ui.core.message.ControlMessageProcessor();
		oMessageManager.registerMessageProcessor(oMessageProcessor);

		var oNameInput = this.getView().byId("productNameInput")

		var sTarget = oInputData.withTarget ? oNameInput.getId() + "/value" : "";

		oMessageManager.addMessages(
			new sap.ui.core.message.Message({
				message: oInputData.message,
				description: oInputData.description,
				type: oInputData.messageType,
				target: sTarget,
				persistent: oInputData.isPersistent,
				processor: oMessageProcessor
			})
		);
	},

	onCreateServerMessage: function(oEvent) {

		var oComponent = this.getOwnerComponent();
		var oProductModel = oComponent.getModel("product");

		var oView = this.getView();
		var oInputData = oView.getModel("input").getData();

		var sPath = oView.getBindingContext("product").getPath();

		var oMessageManager = sap.ui.getCore().getMessageManager();
		oMessageManager.registerMessageProcessor(oProductModel);

		var sTarget = oInputData.withTarget ? sPath + "/Name" : "";

		oMessageManager.addMessages(
			new sap.ui.core.message.Message({
				message: oInputData.message,
				description: oInputData.description,
				type: oInputData.messageType,
				target: sTarget,
				persistent: oInputData.isPersistent,
				processor: oProductModel
			})
		);
	},

	onDisplayMessages: function(oEvent) {

		var oMP = new sap.m.MessagePopover({
			items: {
				path: "message>/",
				template: new sap.m.MessagePopoverItem({
					description: "{message>description}",
					type: "{message>type}",
					title: "{message>message}"
				})
			}
		});

		oMP.setModel(
			sap.ui.getCore().getMessageManager()
			.getMessageModel(), "message");

		oMP.openBy(
			this.getView()
			.byId("idDisplayMessagesButton"));

	},

	onRemoveMessages: function(oEvent) {
		var oMessageManager = sap.ui.getCore().getMessageManager();
		oMessageManager.removeAllMessages();
	},

	onShowProduct: function(oEvent) {

		var oView = this.getView();
		var oInputData = oView.getModel("input").getData();

		oView.bindElement({
			path: "product>/Products(" + oInputData.productId + ")"
		});
	}

});