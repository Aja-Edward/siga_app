'use client'

import { useContext } from 'react'
import CartContext from '@context/CartContext'
import { useSession } from 'next-auth/react'

import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import AuthContext from '@context/AuthContext'

const WishList = ({ type }) => {
  const { addItemToCart, cart, deleteItemFromCart } = useContext(CartContext)
  console.log(cart?.cartItems)

  const { user, setUser } = useContext(AuthContext)

  const { data: session, status } = useSession()
  console.log(session)
  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1
    const item = { ...cartItem, quantity: newQty }

    // if (newQty > Number(cartItem.quantity)) return
    addItemToCart(item)
  }

  const decrementQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1
    const item = { ...cartItem, quantity: newQty }

    if (newQty <= 0) return
    addItemToCart(item)
  }

  return (
    <section style={{ width: '80%', margin: '0 auto' }}>
      <div>
        <h2 className='wishlisttitle'>
          {cart?.cartItems?.length || 0} Service(s) in {type}
        </h2>
        {cart?.cartItems?.length && <hr />}
      </div>

      {cart?.cartItems?.length > 0 && (
        <section className='cart-items-section '>
          <div style={{ width: '100%' }}>
            <main>
              <article style={{ width: '100%' }}>
                {cart?.cartItems
                  ?.filter((cartItem) => cartItem.userId === session?.user?.id)
                  .map((cartItem) => (
                    <div key={cartItem.id} style={{ width: '100%' }}>
                      <div className='cart-item' style={{ width: '100%' }}>
                        <figure
                          className='cart-item-figure'
                          style={{ width: '100%' }}
                        >
                          <div>
                            <Image
                              className='cart-item-image'
                              src={
                                cartItem.image
                                  ? cartItem.image
                                  : '/assets/images/song3.jpg'
                              }
                              alt='Title'
                              width={60}
                              height={60}
                            />
                          </div>

                          <figcaption className='figcaption'>
                            <p>
                              <a href='#' className='wish_name'>
                                {cartItem.name}
                              </a>
                            </p>
                            <p className='wish_category'>
                              {' '}
                              Category: {cartItem.category}
                            </p>
                          </figcaption>
                        </figure>

                        <div className='wish-btn-container'>
                          <div className='wish-btn-wrapper'>
                            <button
                              data-action='decrement'
                              className=' wish-qty-btn'
                              onClick={() => decrementQty(cartItem)}
                            >
                              -
                            </button>
                            <input
                              type='number'
                              className='wish_input'
                              name='custom-input-number'
                              value={cartItem.quantity}
                              readOnly
                            />
                            <button
                              data-action='increment'
                              className='wish_qty_btn_increment'
                              onClick={() => increaseQty(cartItem)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className='wish_remove_container'>
                          <div className='remove-btn-container'>
                            <button
                              className='remove-button'
                              onClick={() =>
                                deleteItemFromCart(cartItem?.service)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <hr style={{ margin: '4px 0' }} />
                    </div>
                  ))}
              </article>
            </main>
          </div>
        </section>
      )}
      {cart?.cartItems?.length && (
        <Link href={'/'} className='backtoshop_link'>
          Back to shop
        </Link>
      )}
    </section>
  )
}

export default WishList
