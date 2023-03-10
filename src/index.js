
import React from 'react';
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import { Provider } from 'react-redux';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './Pages/Login';
import ErrorPage from './Pages/ErrorPage';
import SignUp from './Pages/SignUp';
import ProtectedWrapper from './Pages/ProtectedWrapper';
import Welcome from './Pages/Welcome';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

const theme = extendTheme({
  styles: {
    global: {
      ".mainBg": {
        backgroundImage: 'url("./bg.svg")',
        backgroundSize: 'cover'
      }
    },

  },

  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              }
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
              ...activeLabelStyles
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              color: 'gray.500',
              mx: 3,
              px: [1, 2],
              my: [1, 2],
              transformOrigin: "left top"
            }
          }
        }
      }
    }
  }
});
//console.log(localStorage.getItem('firebase:authUser:AIzaSyBiwGLTM7B9LxKqjPRjiA_CcPTyr8uiFzE:[DEFAULT]'));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <ProtectedWrapper><App /></ProtectedWrapper>
  }
]);
root.render(
  <ChakraProvider theme={theme}>
    {/* <ColorModeScript /> */}
    <Box className='mainBg'>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Box>

  </ChakraProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
