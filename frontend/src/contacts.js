import axios from "axios";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getContacts(query) {
  let response = await axios.get("http://localhost:6969/contacts");
  let contacts = response.data;
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  let response = await axios.post("http://localhost:6969/contacts");
  return response.data;
}

export async function getContact(id) {
  let response = await axios.get(`http://localhost:6969/contacts/${id}`);
  return response.data;
}

export async function updateContact(id, updates) {
  let response = await axios.patch(
    `http://localhost:6969/contacts/${id}`,
    updates,
  );
  return response.data;
}

export async function deleteContact(id) {
  let response = await axios.delete(`http://localhost:6969/contacts/${id}`);
  return response.data;
}
