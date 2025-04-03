import { useQuotes } from './hooks/useQuotes'

function App() {
  const quotes = useQuotes();
  console.log('quotes', quotes);
  return (
      <div>Hello</div>
  )
}

export default App
