import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [msg, setMsg] = useState("")
  const [telefones, setTelefones] = useState("")
  const [params, setParams] = useState([
    "nome",
    "data"
  ])
  const [paramsData, setParamsData] = useState([
    {
      name: "nome",
      value: ""
    },
    {
      name: "data",
      value: ""
    }
  ])

  useEffect(() => {
    const temp = params.map(i => ({
      name: i,
      value: ""
    }))
    setParamsData(temp)
  }, [params])

  const setParamsDataValue = (index, value) => {
    let temp = [ ...paramsData ]
    temp[index].value = value
    setParamsData(temp)
  }

  const submit = (e) => {
    e.preventDefault()
    let temp = paramsData.map(i => {
      i.value = i.value.split("\n")
      return { ...i }
    })
    let newMsg = msg.replaceAll("\n", "%0A")
    newMsg = newMsg.replaceAll(" ", "%20")
    let msgsArr = paramsData[0].value

    msgsArr = msgsArr.map(_ => {
      paramsData.forEach(i => {
        i.value.forEach((item) => {
           newMsg.replaceAll(`{${i.name}}`, item)
        })
      })
    })
    
    newMsg = msg.replaceAll("", "%20")
    console.log(temp)
  }
  return (
    <div>
      <form onSubmit={e => submit(e)}>
        <label htmlFor="message">Insira sua mensagem aqui: </label>
        <textarea
          id="message"
          value={msg}
          onChange={e => setMsg(e.target.value)}
        ></textarea>
        <textarea
          id="telefones"
          value={telefones}
          onChange={e => setTelefones(e.target.value)}
        ></textarea>
        {
          params.map((item, index) => (
            <textarea
              id={item}
              value={paramsData[index].value}
              onChange={e => setParamsDataValue(index, e.target.value)}
            ></textarea>
          ))
        }
        <input type="submit"/>
      </form>
    </div>
  );
}

export default App;
