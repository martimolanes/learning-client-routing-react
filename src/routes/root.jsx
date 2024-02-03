import { useEffect } from "react";
import {
  Outlet,
  Link,
  NavLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

// The loader function is an async function that is called before rendering the component.
// It receives the request object, extracts the search query from the request URL,
// and calls getContacts to fetch the contacts that match the query.
// It returns an object with the fetched contacts and the search query.
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  let contacts = await getContacts(q);
  return { contacts, q };
}

// The action function is an async function that is called when the route is matched.
// It calls createContact to create a new contact and then redirects the user to the edit page for the new contact.
export async function action() {
  let contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

// default export of this module
// It renders the sidebar with a search form and a list of contacts, and the main content area with an Outlet.
export default function Root() {
// It uses the useLoaderData hook to access the data that was loaded by the loader function,
  const { contacts, q } = useLoaderData();
// useNavigation and useSubmit hooks to handle navigation and form submission.
  const navigation = useNavigation();
  const submit = useSubmit();

     // Determine if a search is currently being performed
    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    // When the search query changes, update the input field value
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                      replace: !isFirstSearch,
                  });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    ClassName={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    <Link to={`contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
                    </Link>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail"
      className={
          navigation.state === "loading" ? "loading" : ""
      }
      >
      {
          /* The Outlet component is used to render the child route's component.
          For example, if the current URL is /contacts/1, the Outlet will render the component
          associated with the /contacts/:contactId route. */
      }
      <Outlet />
      </div>
    </>
  );
}
