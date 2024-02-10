import axios from "axios";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

const API_URL = "http://localhost:6969"

export async function getContacts(query) {
  let response = await axios.get(API_URL + "/contacts");
  let contacts = response.data;
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  let response = await axios.post(API_URL + "/contacts");
  return response.data;
}

export async function getContact(id) {
  let response = await axios.get(API_URL + `/contacts/${id}`);
  return response.data;
}

export async function updateContact(id, updates) {
  let response = await axios.patch(
    API_URL + `/contacts/${id}`,
    updates,
  );
  return response.data;
}

export async function deleteContact(id) {
  let response = await axios.delete(API_URL + `/contacts/${id}`);
  return response.data;
}
