import React from 'react'
import Link from 'next/link'

const DeniedPage = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '10px',
      }}
    >
      {' '}
      <h1 style={{ maxHeight: '3rem', marginTop: ' 2rem', color: 'red' }}>
        Access Denied!!!
      </h1>
      <p
        style={{
          maxHeight: '3rem',
          marginTop: ' 2rem',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        You must be either an Admin or Manager to view this page
      </p>
      <Link
        href={'/'}
        style={{
          marginTop: ' 2rem',
          color: '#ffffff',
          padding: '10px 15px',
          backgroundColor: 'rgb(59, 200, 230)',
          border: 'none',
          borderRadius: '50px',
        }}
      >
        Back to Homepage
      </Link>
    </div>
  )
}

export default DeniedPage
