import React from "react";

// Pages
import "./index.css"; 
import App from "./App";

// Theme
import theme from "./theme"; 

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

// React dom
import ReactDOM from "react-dom/client";

// Style
import { ThemeProvider } from "@mui/material/styles";

// React query
import { QueryClient, QueryClientProvider } from "react-query";

import WebFont from "webfontloader";
 
const queryClient = new QueryClient();

WebFont.load({
  google: {
    families: ["Rubik:300,400,500,600,700"]
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
