import React from 'react'
import ButtonGradient from './ButtonGradient'
import ButtonCheckout from './ButtonCheckout'
import Image from 'next/image'
import Link from 'next/link'
import ButtonLogout from './ButtonLogout'
import { useSession } from 'next-auth/react'


export const Nav = () => {
  const { data: session } = useSession()
  return (
   
    <div className="navbar bg-base-100 sticky inset-x-0 top-0 z-50 px-8    ">
       
  <div className="navbar-start">
  {session && (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link href="/create-qr">Generator</Link></li>
      <li><Link href="/dashboard">My QR's</Link></li>
      <li><a><ButtonCheckout/></a></li>
      <li><a><ButtonLogout/></a></li>
      </ul>
    </div>
    )}
    <Link href="/" >
      <Image src="/logoAndName.png" alt="Logo" className="h-10 w-auto" width={100} height={100} />
      </Link>
  </div>
  
  {session && (
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     <li><Link href="/create-qr">Generator</Link></li>
      <li><Link href="/dashboard">My QR's</Link></li>
      <li><a><ButtonCheckout/></a></li>
      <li><a><ButtonLogout/></a></li>
    </ul>
  </div>
    )}
  <div className="navbar-end">
  <ButtonGradient />
  </div>
</div>
  )
}
