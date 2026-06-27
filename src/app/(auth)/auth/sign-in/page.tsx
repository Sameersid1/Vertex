import React from 'react'
import Image from 'next/image'
import SignInFormClient from '../../../../../modules/auth/actions/components/hooks/types/sign-in-form'
function page() {
  return (
    <>
      <Image src={"/login.svg"} alt="Login-Image" height={300} width={300} className='m-6 object-cover'/>
      <SignInFormClient/>
    </>
  )
}

export default page
