sap.ui.define([], function () {
    "use strict";

    return {
        toLocalDateTime: function (sValue) {
            return sValue !== undefined ? new Date(sValue).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }) : "";
        },

        toLocalDate: function (sValue) {
            return sValue !== undefined || sValue !== null ? new Date(sValue).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }) : "";
        },

        toLocalTime: function (sValue) {
            return sValue !== undefined ? new Date(sValue).toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" }) : ""
        },

        toProductImage: function (sValue) {
            if (sValue === undefined || sValue === null)
                return "sap-icon://product";
            else
                return "data:image/bmp;base64," + sValue.substr(104);
        },

        toCurrency: function (sValue) {
            return sValue !== undefined ? Number(sValue).toFixed(2) : undefined;
        },

        toTotalOrder: function (sDiscount, sPrice, sQtde) {
            return Number((1 - sDiscount) * sPrice * sQtde).toFixed(2);
        },

        toDiscountState: function (sValue) {
            if (sValue > 0.50)
                return "Error";
            else if (sValue > 0.25)
                return "Warning";
            else if (sValue > 0)
                return "Success";
            else
                return "None";
        },

        toPercentage: function (sValue) {
            return (sValue * 100) + " %";
        }
    }
});