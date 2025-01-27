import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext/CartContext.jsx'
import ThemeProviderComponent from "./context/ThemeContext/ThemeContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProviderComponent>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProviderComponent>
  </StrictMode>,
)
