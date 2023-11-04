'use client'
import { useState } from 'react'
import Spinner from '@components/Spinner'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaLastfmSquare } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'
import ResetPasswordForm from '@components/auth/ResetPasswordForm'
import { useRouter } from 'next/navigation'

const ResetPasswordPage = ({ params }) => {
  console.log(params)

  const router = useRouter()

  const [authState, setAuthState] = useState({
    password: '',
    cpassword: '',
  })
  const [loading, setLoading] = useState(false)

  const searchParam = useSearchParams()

  const submitHandler = (e) => {
    e.preventDefault()

    if (!authState.password || !authState.cpassword) {
      return toast.error('password or confirm password field cannot be empty')
    }
    setLoading(true)

    axios
      .post('/api/message/reset_password', {
        email: params.email,
        signature: searchParam.get('signature'),
        password: authState.password,
        password_confirm: authState.cpassword,
      })

      .then((res) => {
        const response = res.data
        console.log(response)
        if (response.status === 400) {
          toast.error(response.message, { theme: 'colored' })
        } else if (response.status === 500) {
          toast.error(response.statusText, { theme: 'colored' })
        } else if (response.status === 200) {
          toast.success(response.message, { theme: 'colored' })
          router.push('/login')
        }
        setLoading(false)
      })
      .catch((err) => {
        toast.error(err.message, { theme: 'colored' })
        setLoading(false)
      })
  }

  return (
    <div style={{ backgroundColor: '#faf9f9' }}>
      <ResetPasswordForm
        authState={authState}
        setAuthState={setAuthState}
        submitHandler={submitHandler}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  )
}

export default ResetPasswordPage
