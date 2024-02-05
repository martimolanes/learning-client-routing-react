import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

// The action function is an async function that is called when the route is matched.
// It receives the params object, which contains the contactId.
// The function calls deleteContact to delete the contact with the provided contactId.
export async function action({ params }) {
  await deleteContact(params.contactId);
// After the contact is deleted, it redirects the user to the home page ("/")
  return redirect("/");
}
