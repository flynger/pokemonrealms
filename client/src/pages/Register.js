import "./Register.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Register({ isLogin = false }) {
  const [error, setError] = useState("INSERT ERROR");

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="Register">
            <br />
            <h1 className="mb-5 text-center">Pokémon Realms</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
                <Form.Text className="text-muted">
                  {isLogin ? "" :
                    <>
                      We recommend you use a different password than the one you use for other websites.
                      < br />
                    </>
                  }
                </Form.Text>
                <Form.Text className="text-danger">
                  {error}
                </Form.Text>
              </Form.Group>
              {isLogin ? <></> :
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="I agree to the Pokémon Trainer code of conduct." required />
                </Form.Group>
              }
              <Button variant="primary" type="submit">
                {isLogin ? "Login" : "Register"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;