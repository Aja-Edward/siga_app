'use client'

import { CartProvider } from '@context/CartContext'
import { userCartProvider } from '@context/userCartContext'
import { AuthProvider } from '@context/AuthContext'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function GlobalContextProvider({ children, session }) {
  return (
    <>
      <ToastContainer position='top-right' />
      <SessionProvider session={session}>
        <AuthProvider>
          <CartProvider>
            <userCartProvider>{children}</userCartProvider>
          </CartProvider>
        </AuthProvider>
      </SessionProvider>
    </>
  )
}
