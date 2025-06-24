import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import models from "../model/models";
import Button from "sap/m/Button";
import Input from "sap/m/Input";
import Dialog from "sap/m/Dialog";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import { Book } from "../model/types";

/**
 * @namespace my.bookapp.controller
 */

export default class Main extends BaseController {
	public onInit(): void {
		// Neues JSONModel für Bücher anlegen und an View setzen
		const oBookModel = models.createBookModel();
		this.setModel(oBookModel);

		// Bücher vom Backend laden
		fetch("http://127.0.0.1:8000/books")
			.then((res) => res.json())
			.then((data) => {
				console.log("Bücher geladen:", data);
				oBookModel.setData({ books: data });
			})
			.catch(() => {
				MessageBox.error("Fehler beim Laden der Bücher");
			});
	}

	public onAddBook(): void {
		const inputTitle = new Input({ placeholder: "Titel" });
		const inputAuthor = new Input({ placeholder: "Autor" });
		const inputCreatedBy = new Input({ placeholder: "Erstellt von" });

		const oDialog = new Dialog({
			title: "Neues Buch hinzufügen",
			content: [inputTitle, inputAuthor, inputCreatedBy],
			beginButton: new Button({
				text: "Hinzufügen",
				press: () => {
					const newBook = {
						title: inputTitle.getValue(),
						author: inputAuthor.getValue(),
						created_by: inputCreatedBy.getValue(),
					};

					fetch("http://localhost:8000/books", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(newBook),
					}).then(async () => {
						const res = await fetch("http://localhost:8000/books");
						const updatedBooks = await res.json();

						const oModel = this.getView().getModel() as JSONModel;
						oModel.setData({ books: updatedBooks });

						MessageToast.show("📘 Buch hinzugefügt!");
						oDialog.close();
					});
				},
			}),
			endButton: new Button({
				text: "Abbrechen",
				press: () => oDialog.close(),
			}),
		});

		oDialog.open();
	}

	public onEditBook(oEvent: any): void {
		const oBook: Book = oEvent.getSource().getParent().getBindingContext().getObject();

		const inputTitle = new Input({ value: oBook.title });
		const inputAuthor = new Input({ value: oBook.author });
		const inputCreatedBy = new Input({ value: oBook.created_by });

		const oDialog = new Dialog({
			title: "Buch bearbeiten",
			content: [inputTitle, inputAuthor, inputCreatedBy],
			beginButton: new Button({
			text: "Speichern",
			press: () => {
				const updatedBook = {
				...oBook,
				title: inputTitle.getValue(),
				author: inputAuthor.getValue(),
				created_by: inputCreatedBy.getValue(),
				};

				fetch(`http://localhost:8000/books/${oBook.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedBook),
				}).then(() => {
				const oModel = this.getView().getModel() as JSONModel;
				const data = oModel.getData().books;
				const index: number = data.findIndex((b: Book) => b.id === updatedBook.id);
				data[index] = updatedBook;
				oModel.setData({ books: data });
				MessageToast.show("Buch aktualisiert");
				oDialog.close();
				});
			}
			}),
			endButton: new Button({ text: "Abbrechen", press: () => oDialog.close() })
		});

		oDialog.open();
	}
}
