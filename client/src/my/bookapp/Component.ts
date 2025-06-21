sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/core/mvc/XMLView",
  "sap/ui/model/json/JSONModel"
], function (
  UIComponent: typeof import("sap/ui/core/UIComponent").default,
  XMLView: typeof import("sap/ui/core/mvc/XMLView").default,
  JSONModel: typeof import("sap/ui/model/json/JSONModel").default
) {
  console.log("Component loaded");
  return UIComponent.extend("my.bookapp.Component", {
    metadata: {
      manifest: "json"
    },
    
    async createContent(this: any) {
      console.log("createContent called");

      const oView = await XMLView.create({
        viewName: "my.bookapp.view.Main"
      });

      const oModel = new JSONModel();
      oView.setModel(oModel);

      fetch("http://127.0.0.1:8000/books")
        .then((res) => res.json())
        .then((data) => {
          console.log("📚 Fetched books:", data);
          oModel.setData({ books: data });
        });

      return oView;
    }
  });
});
