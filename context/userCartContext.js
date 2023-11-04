'use client'

// import { createContext, useEffect, useState } from 'react'

// const userCartContext = createContext()

// export const userCartProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([])

//   const fetchUserWishlist = (userId) => {
//     const items = JSON.parse(localStorage.getItem('wishlist')) || {}
//     const userWish = items[userId] || []
//     setWishlist(userWish)
//   }

//   console.log(wishlist)

//   useEffect(() => {
//     setCartToState()
//   }, [])

//   const setCartToState = () => {
//     setWishlist(
//       localStorage.getItem('wishlist')
//         ? JSON.parse(localStorage.getItem('wishlist'))
//         : []
//     )
//   }

//   const addItemToCart = async ({
//     userId,
//     service,
//     name,
//     image,
//     availability,
//     category,
//     quantity,
//   }) => {
//     const item = {
//       service,
//       name,
//       image,
//       quantity,
//       category,
//       availability,
//     }

//     const wishlist = JSON.parse(localStorage.getItem('wishlist')) || {}
//     const userWish = wishlist[userId] || []

//     const isItemExist = userCart.find((i) => i.service === item.service)

//     let newUserCart

//     if (isItemExist) {
//       newUserCart = userCart.map((i) =>
//         i.service === isItemExist.service ? item : i
//       )
//     } else {
//       newUserCart = [...userCart, item]
//     }

//     wishlist[userId] = newUserCart
//     localStorage.setItem('wishlist', JSON.stringify(wishlist))
//     fetchUserWishlist(userId)
//   }

// cart_object = [ ]
// cart_object = {userId1: [...], userId2 = [...] }

// let cart_object = { }

// if(!cart_object.hasOwnProperty(userId)){
//     cart_object[userId] = [ item ]
// } else { cart_object[userId] = [...cart_object[userId], item}
// }
// localStorage.setItem(JSON.stringify(cart_object))
// setCartToState()

//   const deleteItemFromCart = (id) => {
//     const newCartItems = cart?.cartItems?.filter((i) => i.service !== id)
//     localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }))
//     setCartToState()
//   }
//   return (
//     <userCartContext.Provider
//       value={{ wishlist, addItemToCart, deleteItemFromCart }}
//     >
//       {children}
//     </userCartContext.Provider>
//   )
// }
// export default userCartContext

import React, { createContext, useContext, useEffect, useState } from 'react' // Import React and other necessary dependencies
import { useSession } from 'next-auth/react'

const UserCartContext = createContext()

export function UserCartProvider({ children }) {
  // Use camelCase for function and variable names
  const [cart, setCart] = useState([])
  const { data: session, status } = useSession()

  const fetchUserCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || {}
    const userCart = cartData[session?.user?.id] || []
    setCart(userCart)
  }

  useEffect(() => {
    if (session?.user?.id) {
      // Check if user ID is available before fetching cart
      fetchUserCart()
    }
  }, [session])

  const addItemToCart = async (item) => {
    if (!session?.user?.id) {
      return // Don't proceed if user is not authenticated
    }

    const cartData = JSON.parse(localStorage.getItem('cart')) || {}
    const userCart = cartData[session.user.id] || []

    const isItemExist = userCart.find((i) => i.service === item.service)

    let newUserCart
    if (isItemExist) {
      newUserCart = userCart.map((i) =>
        i.service === isItemExist.service ? item : i
      )
    } else {
      newUserCart = [...userCart, item]
    }

    cartData[session.user.id] = newUserCart
    localStorage.setItem('cart', JSON.stringify(cartData))
    fetchUserCart()
  }

  const deleteItemFromCart = (itemId) => {
    if (!session?.user?.id) {
      return
    }

    const cartData = JSON.parse(localStorage.getItem('cart')) || {}
    const userCart = cartData[session.user.id] || []
    const newCartItems = userCart.filter((i) => i.service !== itemId)

    cartData[session.user.id] = newCartItems
    localStorage.setItem('cart', JSON.stringify(cartData))
    fetchUserCart()
  }

  return (
    <UserCartContext.Provider
      value={{ cart, addItemToCart, deleteItemFromCart }}
    >
      {children}
    </UserCartContext.Provider>
  )
}

export function useUserCart() {
  return useContext(UserCartContext) // Custom hook to easily access the cart context
}
