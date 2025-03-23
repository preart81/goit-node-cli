import chalk from "chalk";
import { program } from "commander";
import { addContact, getContactById, listContacts, removeContact } from "./contacts.js";

program
  .option("-a, --action <type>", "choose action: list, get, add, remove")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // список всіх контактів
      const contacts = await listContacts();
      console.log(contacts);
      return;

    case "get":
      // об'єкт контакту за id
      if (!id) {
        console.warn(chalk.red("Missing id!"));
        return;
      }
      const contact = await getContactById(id);
      if (!contact) {
        console.warn(chalk.red("Contact not found!"));
      } else {
        console.log(contact);
      }
      return;

    case "add":
      // створення нового контакту name email phone
      if (!(name || email || phone)) {
        console.warn(chalk.red("Missing required fields!"));
        return;
      }
      const newContact = await addContact(name, email, phone);
      console.log("Contact added:", newContact);
      return;

    case "remove":
      // видалення контакту за id
      if (!id) {
        console.warn(chalk.red("Missing id!"));
        return;
      }
      const removedContact = await removeContact(id);
      if (!removedContact) {
        console.warn(chalk.red("Contact not found!"));
      } else {
        console.log(chalk.red("Contact removed:"), removedContact);
      }
      return;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
}

invokeAction(options);
