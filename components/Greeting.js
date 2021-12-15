export default function Greeting({user}) {
  return (
    <div className="text-white text-6xl">
      <h1>
        Hello, <span className='text-pink-300'>{user.email}</span>!
      </h1>
    </div>
  )
}