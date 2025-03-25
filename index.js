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
      console.table(contacts);
      break;

    case "get":
      // об'єкт контакту за id
      if (!id) {
        console.warn(chalk.red("Missing id!"));
        break;
      }
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case "add":
      // створення нового контакту name email phone
      if (!(name || email || phone)) {
        console.warn(chalk.red("Missing required fields!"));
        break;
      }
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      // видалення контакту за id
      if (!id) {
        console.warn(chalk.red("Missing id!"));
        break;
      }
      const removedContact = await removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
}

invokeAction(options);
