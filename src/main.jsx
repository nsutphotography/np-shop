import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext/CartContext.jsx'
import ThemeProviderComponent from "./context/ThemeContext/ThemeContext.jsx";
import { AddressProvider } from './context/AddressContext/AddressContext.jsx';
import GoogleAuthProvider from './context/GoogleAuthProvider.jsx';
import { OrderProvider } from './context/OrderContext/OrderContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderComponent>
      <OrderProvider>

        <AddressProvider>
          <CartProvider>
            <GoogleAuthProvider>

              <App />
            </GoogleAuthProvider>
          </CartProvider>
        </AddressProvider>
      </OrderProvider>

    </ThemeProviderComponent>
  </StrictMode>,
)
