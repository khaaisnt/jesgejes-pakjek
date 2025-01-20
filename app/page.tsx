"use client"

import { useState } from "react"

const LoginPage = () => {
  const [username, setUsername] 
    = useState<string>("")
  const [password, setPassword]
    = useState<string>("")

    return (
      <div className="w-dvw h-dvh flex justify-center items-center">
        <form className="w-5/6 md:w-1/2 p-3" action="">
        
        </form>
      </div>
    )
}

export default LoginPage