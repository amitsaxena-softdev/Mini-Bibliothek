var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/Dialog", "sap/m/Button", "sap/m/Input"], function (require, exports, Controller_1, MessageToast_1, Dialog_1, Button_1, Input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Controller_1 = __importDefault(Controller_1);
    MessageToast_1 = __importDefault(MessageToast_1);
    Dialog_1 = __importDefault(Dialog_1);
    Button_1 = __importDefault(Button_1);
    Input_1 = __importDefault(Input_1);
    var MainController = /** @class */ (function (_super) {
        __extends(MainController, _super);
        function MainController() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.selectedBook = null;
            return _this;
        }
        MainController.prototype.onInit = function () {
            // nothing needed here yet
        };
        MainController.prototype.onEditBook = function (oEvent) {
            var _this = this;
            var oBook = oEvent.getSource().getBindingContext().getObject();
            this.selectedBook = __assign({}, oBook);
            var inputTitle = new Input_1.default({ value: oBook.title });
            var inputAuthor = new Input_1.default({ value: oBook.author });
            var oDialog = new Dialog_1.default({
                title: "Buch bearbeiten",
                content: [inputTitle, inputAuthor],
                beginButton: new Button_1.default({
                    text: "Speichern",
                    press: function () {
                        var updatedBook = __assign(__assign({}, oBook), { title: inputTitle.getValue(), author: inputAuthor.getValue() });
                        fetch("http://localhost:8000/books/".concat(oBook.id), {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatedBook),
                        }).then(function () {
                            var oView = _this.getView();
                            if (oView) {
                                var oModel = oView.getModel();
                                var data = oModel.getData();
                                var index = data.findIndex(function (b) { return b.id === updatedBook.id; });
                                data[index] = updatedBook;
                                oModel.setData(data);
                                MessageToast_1.default.show("Gespeichert");
                            }
                            oDialog.close();
                        });
                    },
                }),
                endButton: new Button_1.default({ text: "Abbrechen", press: function () { return oDialog.close(); } }),
            });
            oDialog.open();
        };
        return MainController;
    }(Controller_1.default));
    exports.default = MainController;
});
