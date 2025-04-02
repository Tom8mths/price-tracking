import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuotes } from './hooks/useQuotes'

function App() {
  const [count, setCount] = useState(0)
  const [quotes, setQuotes] = useQuotes();
  console.log('quotes', quotes);
  
  return (
      <div>Hello</div>
  )
}

export default App
