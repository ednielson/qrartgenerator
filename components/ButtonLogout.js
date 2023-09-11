import React from 'react'
import { signOut } from "next-auth/react";

const ButtonLogout = () => {
  return (
    <button
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
    </button>
  )
}

export default ButtonLogout