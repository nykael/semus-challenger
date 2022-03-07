import { FormEvent, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'

import axios from 'axios'
import { request } from 'https'

const formRegister = {
  name: '',
  email: ''
}

export function EditUser() {
  const history = useHistory()
  const params: any = useParams()

  const [userForm, setUserForm] = useState(formRegister)

  const hendleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitForm()
  }

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

  const submitForm = async () => {
    try {
      await axios.patch(
        `https://app-adonis-api.herokuapp.com/users/${params.id}`,
        userForm
      )
      history.push('/')
    } catch (error) {
      alert('Erro ao editar usuario')
    }
  }

  return (
    <div className="container">
      <h1>Editar</h1>

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
                  email: userForm.email
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
                  email: event.target.value
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
