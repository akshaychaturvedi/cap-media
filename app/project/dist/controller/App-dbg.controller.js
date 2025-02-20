sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("project.controller.App", {
        onInit: function () {
            this.oModel = this.getOwnerComponent().getModel();
        },        

        onUpload: function (oEvent) {
            var oFileUploader = this.getView().byId("uploader");
            var oFile = oFileUploader.oFileUpload.files[0];

            if (!oFile) {
                MessageToast.show("Please select a file first.");
                return;
            }

            var reader = new FileReader();
            reader.onload = function (e) {
                var sBase64 = e.target.result.split(",")[1];

                var oPayload = {
                    content: sBase64,
                    mediaType: oFile.type,
                    fileName: oFile.name,
                    size: oFile.size
                };

                this.oModel.create("/Files", oPayload, {
                    success: function () {
                        MessageToast.show("File uploaded successfully.");
                    },
                    error: function (oError) {
                        MessageToast.show("File upload failed.");
                    }
                });
            }.bind(this);


            reader.readAsDataURL(oFile);
        },

        onDownload: function (oEvent) {
            var sUrl = oEvent.getSource().getBindingContext().getProperty("url");
            if (sUrl) {
                window.open(sUrl, "_blank");
            } else {
                MessageToast.show("Download link not available.");
            }
        }

    });
});