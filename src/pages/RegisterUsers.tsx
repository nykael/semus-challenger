import { FormEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

const formRegister = {
  name: '',
  email: '',
  passowrd: ''
}

export function RegisterUsers() {
  const history = useHistory()

  const [userForm, setUserForm] = useState(formRegister)

  const hendleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitForm()
  }

  const submitForm = async () => {
    try {
      await axios.post('https://app-adonis-api.herokuapp.com/users', userForm)
      history.push('/')
    } catch (error) {
      alert('Erro ao registrar usuario')
    }
  }

  return (
    <div className="container">
      <h1>Registro</h1>

      <main>
        <Form onSubmit={hendleOnSubmit}>
          <Form.Group className="mb-3" controlId="nomeId">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              type="name"
              placeholder="Nome do usuario"
              value={userForm.name}
              required
              onChange={event => {
                setUserForm({
                  name: event.target.value,
                  email: userForm.email,
                  passowrd: userForm.passowrd
                })
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="emailId">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              placeholder="Seu email"
              required
              value={userForm.email}
              onChange={event => {
                setUserForm({
                  name: userForm.name,
                  email: event.target.value,
                  passowrd: userForm.passowrd
                })
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="passworId">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Senha"
              required
              value={userForm.passowrd}
              onChange={event => {
                setUserForm({
                  name: userForm.name,
                  email: userForm.email,
                  passowrd: event.target.value
                })
              }}
            />
          </Form.Group>
          <Button variant="outline-success" type="submit">
            Enviar
          </Button>
        </Form>
      </main>
    </div>
  )
}
