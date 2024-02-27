
import axios from 'axios'

function App() {
 const handlepost = () => {
    axios.post('http://localhost:7777/workers/create', {
      name: 'prueba',
      job: 'prueba2',
    })
 }

  return (
    <>
<div>
  <button onClick={handlepost}>Magia</button>
</div>
    </>
  )
}

export default App
