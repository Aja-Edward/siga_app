'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Spinner from '@components/Spinner'
import AuthContext from '@context/AuthContext'

const ReviewServiceForm = ({ service }) => {
  console.log(service)
  const { error, clearError } = useContext(AuthContext)
  const { data: session, status } = useSession()
  const [review, setReview] = useState({
    rating: '',
    comment: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const addReview = async () => {
    const id = service?._id

    try {
      setIsLoading(true)
      console.log('serviceId:', id)

      const response = await fetch(`/api/ourservices/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
          name: session?.user?.name,
          rating: review.rating,
          comment: review.comment,
          user: session?.user?._id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('Response:', response)
      if (response.ok) {
        setReview({
          rating: '',
          comment: '',
        })
        alert('Huray! review is added sucessfully!!')
      } else {
        console.log('Failed to add review:', response.statusText)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      clearError()
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await addReview()
    } catch (error) {
      console.error('Error submitting review', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='review-container'>
      {service?.reviews?.comment}
      <section className='review-section'>
        <h2>Write a customer review</h2>
        {error && <div className='review-error '>{error}</div>}
        {session?.user ? (
          <ReviewForm
            review={review}
            setReview={setReview}
            isLoading={isLoading}
            submitHandler={submitHandler}
          />
        ) : (
          <div className='review-signInMessage '>
            Please <Link href={'/login'}>Sign in</Link> to write a comment{' '}
          </div>
        )}
      </section>
    </div>
  )
}

export default ReviewServiceForm

const ReviewForm = ({ review, setReview, isLoading, submitHandler }) => {
  return (
    <form onSubmit={submitHandler} className='formControl '>
      <div id='rating'>
        <label className='rating-label'>Rating</label>
        <select
          style={{ color: 'rgb(var(--foreground-rgb))' }}
          className='review-select'
          type='select'
          value={review?.rating}
          onChange={(e) => setReview({ ...review, rating: e.target.value })}
        >
          <option value=''>Select...</option>
          <option value='1'>1 - Poor</option>
          <option value='2'>2 - Fair</option>
          <option value='3'>3 - Good</option>
          <option value='4'>4 - Very good</option>
          <option value='5'>5 - Excellent</option>
        </select>
      </div>
      <div id='comment'>
        <label className='review-comment'>Comment</label>
        <textarea
          className='review-textarea'
          as='textarea'
          row='5'
          value={review?.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
        />
      </div>
      <div className='reviewbutton'>
        <button
          type='submit'
          className='review-submitButton '
          disabled={isLoading}
        >
          {isLoading ? (
            <div>
              <Spinner /> Submitting...
            </div>
          ) : (
            'SUBMIT'
          )}
        </button>
      </div>
    </form>
  )
}
