import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Table
} from 'react-bootstrap'
import { useState, useEffect } from 'react'

import axios from 'axios'
import { useHistory } from 'react-router-dom'

export function ListUsers() {
  const history = useHistory()

  const [users, setUsers] = useState<any[]>([])

  const loadUsers = async () => {
    const { data } = await axios.get(
      'https://app-adonis-api.herokuapp.com/users'
    )
    setUsers(data)
  }

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`https://app-adonis-api.herokuapp.com/users/${id}`)
      loadUsers()
    } catch (error) {
      alert('Erro ao deletar usuario')
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <div className="container">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Lista de usuarios</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScrolll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Button
                onClick={() => history.push('/register')}
                variant="outline-success"
              >
                Novo
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="space-between ">
                    <Button
                      onClick={() => deleteUser(user.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => history.push(`/edit/${user.id}`)}
                      variant="info"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => history.push(`/select/${user.id}`)}
                      variant="success"
                    >
                      Visualizar
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </main>
    </div>
  )
}
