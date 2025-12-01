import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import AppRouter from "./router";                // router/index.tsx
import { AuthProvider } from "./contexts/AuthContext";
// import { ThemeProvider } from "./contexts/ThemeContext";
import store from "./store/store";

import "./styles/theme.ts";                      // optional: nếu theme inject global styles
// import "./index.css";                            // nếu có tailwind hoặc global css

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        {/* <ThemeProvider> */}
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        {/* </ThemeProvider> */}
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
