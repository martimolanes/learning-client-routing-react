import {
    Form,
    useLoaderData,
    redirect,
    useNavigate
} from "react-router-dom";
import { updateContact } from "../contacts";

// The action function is an async function that is called when the route is matched.
// It receives the request and params objects. It gets the form data from the request,
// converts it into an object, and then calls updateContact to update the contact with
// the provided contactId and the new data from the form. After the contact is updated,
// it redirects the user to the contact's detail page.
export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

// The EditContact function component is the default export of this module.
// It renders a form that allows the user to edit the contact's details.
export default function EditContact() {
// It uses the useLoaderData hook to access the data that was loaded by the loader function.
  const { contact } = useLoaderData();
// It uses the useNavigate hook to get a function that allows it to navigate programmatically.
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </p>
    </Form>
  );
}
