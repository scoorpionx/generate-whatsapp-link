import { useState, useEffect } from 'react'
import './App.css';

function App() {
  const [msg, setMsg] = useState("")
  const [telefones, setTelefones] = useState("")
  const [msgFinal, setMsgFinal] = useState()
  const [params, setParams] = useState([
    "nome",
  ])
  const [paramsData, setParamsData] = useState([
    {
      name: "nome",
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
  
  const onChangeParams = (value) => {
    let temp = value.map(i => ({ name: i, value: "" }))
    setParamsData(temp)
    setParams(value)
  }

  const submit = (e) => {
    e.preventDefault()
    let msgArr = []
    if(params.length > 0) {
      let temp = paramsData.map(i => {
        const newValue = i.value.split("\n")
        return { ...i, value: newValue }
      })

      const capitalizeFirstLetter = (string) =>  {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      temp.forEach(dataItem => {
        if(msgArr.length === 0) {
          msgArr = dataItem.value.map(item => {
            if(dataItem.name === "nome" || dataItem.name === "Nome") {
              let newItem = capitalizeFirstLetter(item.split(" ")[0].toLowerCase())
              return msg.replaceAll(`{${dataItem.name}}`, newItem)
            }
            return msg.replaceAll(`{${dataItem.name}}`, item)
          })
        } else {
          console.log(dataItem)
          msgArr = msgArr.map((item, index) => {
            return item.replaceAll(`{${dataItem.name}}`, dataItem.value[index])
          })
        } 
      })
    }
    let telefonesArr = telefones.split("\n")
    telefonesArr = telefonesArr.map(item => item.replaceAll("(", ""))
    telefonesArr = telefonesArr.map(item => item.replaceAll(")", ""))
    telefonesArr = telefonesArr.map(item => item.replaceAll("-", ""))
    telefonesArr = telefonesArr.map(item => item.replaceAll(" ", ""))
    msgArr = msgArr.map(item => item.replaceAll("\n", "%0A"))
    msgArr = msgArr.map(item => item.replaceAll(" ", "%20"))
    msgArr = msgArr.map((item, index) => `https://wa.me/55${telefonesArr[index]}?text=${item}`)
    setMsgFinal(msgArr)
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
      <p style={{margin: "22px"}}>Os links são gerados toda vez que o botão <b>Enviar é clicado</b> e é gerado um link para cada linha de telefones, então tenha certeza que os parâmetros possuiem a mesma quantidade de linhas que o campo telefone.</p>
      <p>A mensagem deve ser inserida com os <b>parâmetros</b> entre chaves. Ex.:</p>
      <p>Bom dia, sr.(a) <b>{"{nome}"}</b>.</p>
      <hr />
      <form onSubmit={e => submit(e)} style={{ width: "40%"}}>
        <label htmlFor="message">Insira sua <b>mensagem</b> aqui: </label>
        <textarea
          id="message"
          style={{ width: "100%"}}
          value={msg}
          onChange={e => setMsg(e.target.value)}
        ></textarea>
        <label htmlFor="telefones">Insira os <b>telefones</b> aqui: </label>
        <textarea
          id="telefones"
          style={{ width: "100%"}}
          value={telefones}
          onChange={e => setTelefones(e.target.value)}
        ></textarea>
        <label htmlFor="parametros">Insira os <b>parametros</b> aqui: </label>
        <textarea
          id="parametros"
          style={{ width: "100%"}}
          value={params.join("\n")}
          onChange={e => onChangeParams(e.target.value.split("\n"))}
        ></textarea>
        {
          params && params.map((item, index) => (
            <>
            <label htmlFor={item}>Insira aqui o parâmetro: <b>{item}</b></label>
              <textarea
                id={item}
                style={{ width: "100%"}}
                value={paramsData[index].value}
                onChange={e => setParamsDataValue(index, e.target.value)}
              ></textarea>
            </>
          ))
        }
        <input type="submit"/>
      </form>
      <hr />
      {/*
      {msgFinal && (
        <textarea
          id="links"
          style={{ width: "100%"}}
          value={msgFinal.join("\n")}
        ></textarea>
      )}
      */}
      <ul>
        {msgFinal && msgFinal.map((item, index) => <li><a href={item} target="_blank">> Link {paramsData[0].value.split("\n")[index]}</a></li>)}
      </ul>
    </div>
  );
}

export default App;
