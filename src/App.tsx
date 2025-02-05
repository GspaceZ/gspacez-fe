import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import "./App.css";

const router = createRouter({ routeTree });

function App() {
    <RouterProvider router={router} />
}

export default App;
