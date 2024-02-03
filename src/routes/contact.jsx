import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

// This action function is an async function that is called when the route is matched.
// It receives the request and params objects, and it updates a contact's 'favorite' status.
// This function will be invoked after the component is rendered.
export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

// This loader function is an async function that is called when the route is matched,
// before the component is rendered. It fetches the contact data that the component needs.
// If the contact data cannot be fetched, it throws a 404 error.
export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { contact };
}

// The Contact component is the default export of this module.
// It renders the contact's information and provides options to edit or delete the contact.
export default function Contact() {
// useLoaderData hook, access the data that was loaded by the loader function.
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// The Favorite function component is used to display and update a contact's 'favorite' status.
function Favorite({ contact }) {
    // useFetcher hook to access the fetcher object to submit the form data.
  const fetcher = useFetcher();
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post" >
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
