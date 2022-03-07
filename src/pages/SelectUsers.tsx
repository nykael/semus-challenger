import { FormEvent, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'

import axios from 'axios'

const formRegister = {
  name: '',
  email: ''
}

export function SelectUser() {
  const history = useHistory()

  const [userForm, setUserForm] = useState(formRegister)

  const hendleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loadUser()
  }

  const params: any = useParams()

  // mudar o nome da function pra um nome coerente.
  // atualizar o estado com a resposta di axios
  const loadUser = async () => {
    try {
      const { data } = await axios.get(
        `https://app-adonis-api.herokuapp.com/users/${params.id}`
      )
      setUserForm({
        name: data.name,
        email: data.email
      })
      console.log(data)
    } catch (error) {
      alert('Erro ao carregar usuario')
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div className="container">
      <h1>Visualizar</h1>
      <Link to="/">Home</Link>

      <main>
        <Form onSubmit={hendleOnSubmit}>
          <Form.Group className="mb-3" controlId="nomeId">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              type="name"
              disabled
              placeholder="Nome do usuario"
              value={userForm.name}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="emailId">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              disabled
              placeholder="Seu email"
              required
              value={userForm.email}
            />
          </Form.Group>
        </Form>
      </main>
    </div>
  )
}
