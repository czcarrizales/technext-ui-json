import { useState } from 'react'
import './App.css'
import axios from 'axios'
import config from './config'

function App() {

  const [keyword, setKeyword] = useState('')
  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setIsLoading(true)
    setIsDataFetched(false)
    try {
      await axios.post(`${config.backendUrl}/search`, { keyword })
      .then((res) => {
        console.log(res)
        setData(res.data)
        setIsDataFetched(true)
        setIsLoading(false)
      })
      
    } catch (error) {
      console.error('Error performing search:', error)
    }
  }

  return (
    <div className='app-container'>
      <h1>TechNext JSON Search</h1>
      <form onSubmit={handleSubmit} action="" method="post">
        <input placeholder='Enter keyword' type="text" value={keyword} onChange={(e) => {
          setKeyword(e.target.value)
          console.log(keyword)
          console.log(data)
        }} />
        <button type='submit'>Search</button>
      </form>
      {
        !isDataFetched && !isLoading
        ?
        (
          <div>Enter a keyword.</div>
        )
        :
        !isDataFetched && isLoading
          ?
          (
            <div className='text-animation'>Loading data...</div>
          )
          :
          (
            data.length == 0
            ?
            <p>No data found for {keyword}</p>
            :
            <div className='data-container'>
              {data && data.map((item: any) => {
                return <div className='item-container'>
                <p className='date'>{item.date}</p>
                <p className='phase'>{item.phase}</p>
                <p className='text'>{item.text}</p>
                </div>
              })}
            </div>
          )
      }

    </div>
  )
}

export default App