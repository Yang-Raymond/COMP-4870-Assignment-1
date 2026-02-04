import { StrictMode } from 'react'
import './style.css'
import { router } from './Routes.tsx'
import { RouterProvider } from 'react-router-dom'

export default function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
