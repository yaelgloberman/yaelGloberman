import React from "react";

// Pages
import "./index.css";
import App from "./App";

// Theme
import theme from "./theme";

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

//Font
import WebFont from "webfontloader";

// React dom
import ReactDOM from "react-dom/client";

// Style
import { ThemeProvider } from "@mui/material/styles";

// React query
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

WebFont.load({
  google: {
    families: ["Heebo:300,400,500,600,700"],
  },
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
