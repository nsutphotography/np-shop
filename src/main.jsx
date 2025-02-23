import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext/CartContext'
import ThemeProviderComponent from "./context/ThemeContext/ThemeContext.jsx";
import { AddressProvider } from './context/AddressContext/AddressContext.jsx';
import GoogleAuthProvider from './context/GoogleAuthProvider';
import { OrderProvider } from './context/OrderContext/OrderContext';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { ProductContext, ProductProvider } from './context/ProductContext/ProductContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderComponent>
      {/* <ProductContext> */}
      <ProductProvider>

        <AuthProvider>



          <OrderProvider>

            <AddressProvider>
              <CartProvider>
                <GoogleAuthProvider>

                  <App />
                </GoogleAuthProvider>
              </CartProvider>
            </AddressProvider>
          </OrderProvider>


        </AuthProvider>
      </ProductProvider>
      {/* </ProductContext> */}
    </ThemeProviderComponent>
  </StrictMode>,
)
