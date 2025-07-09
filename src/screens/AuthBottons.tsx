import { useClerk, useUser } from '@clerk/clerk-react'

const AuthButtons = () => {
  const { isSignedIn, user } = useUser()
  const { signOut, openSignIn } = useClerk()

  return isSignedIn ? (
    <div>
      <p className="mb-2">Welcome, Agent {user?.firstName}.</p>
      <button
        className="text-sm underline hover:text-red-400"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  ) : (
    <button
      className="bg-cyan-400 text-black py-2 px-5 rounded-md hover:bg-cyan-300 transition"
      onClick={() => openSignIn()}
    >
      Authenticate Agent
    </button>
  )
}

export default AuthButtons
