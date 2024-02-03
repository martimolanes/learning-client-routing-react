import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root, {
  loader as rootloader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {
  loader as contactloader,
  action as contactAction,
} from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";


// Create a BrowserRouter and define the routes for the application.
// Each route is associated with several properties:
// - element: This is the React component that will be rendered when the route is matched.
// - errorElement: This is the Fallback React component that will be rendered when an error occurs in the route's component, loader, or action.
// - loader: This is a function that is invoked when the route is matched, before the element is rendered.
    // It can be used to load data that the route's component needs. 
    // Note: that the loader function should return a Promise. The component will not be rendered until this Promise resolves.
// - action: This is a function that is invoked when the route is matched, after the loader has resolved and the element has been rendered.
    // It can be used to perform additional operations that should occur after the component is displayed, such as analytics tracking.

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootloader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
        // The root route ("/") defaults to the Index component.
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactloader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactloader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops, something went wrong</div>,
          },
        ],
      },
    ],
  },
]);


// Render the RouterProvider component at the root of the DOM, using the created router.
// This sets up the routing for the application.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
