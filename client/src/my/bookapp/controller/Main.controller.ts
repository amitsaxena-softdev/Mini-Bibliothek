import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import Dialog from "sap/m/Dialog";
import Button from "sap/m/Button";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";
import { Book } from "../../../model/models";

export default class MainController extends Controller {
  private selectedBook: Book | null = null;

  public onInit(): void {
    // nothing needed here yet
  }

  public onEditBook(oEvent: any): void {
    const oBook: Book = oEvent.getSource().getBindingContext().getObject();
    this.selectedBook = { ...oBook };

    const inputTitle = new Input({ value: oBook.title });
    const inputAuthor = new Input({ value: oBook.author });

    const oDialog = new Dialog({
      title: "Buch bearbeiten",
      content: [inputTitle, inputAuthor],
      beginButton: new Button({
        text: "Speichern",
        press: () => {
          const updatedBook = {
            ...oBook,
            title: inputTitle.getValue(),
            author: inputAuthor.getValue(),
          };

          fetch(`http://localhost:8000/books/${oBook.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBook),
          }).then(() => {
            const oView = this.getView();
            if (oView) {
              const oModel = oView.getModel() as JSONModel;
              const data = oModel.getData() as Book[];
              const index = data.findIndex(b => b.id === updatedBook.id);
              data[index] = updatedBook;
              oModel.setData(data);
              MessageToast.show("Gespeichert");
            }
            oDialog.close();
          });
        },
      }),
      endButton: new Button({ text: "Abbrechen", press: () => oDialog.close() }),
    });

    oDialog.open();
  }
}
