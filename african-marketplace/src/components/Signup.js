import React from "react";
import axiosWithAuth from "../utilites/axiosWithAuth";
import * as Yup from "yup";
import { Container, Header, Button, Form } from 'semantic-ui-react'

class Signup extends React.Component {

  state = {
    credentials: {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: ''
    }
  };

  handleChange = e => {
    const loginSchema = {
      username: Yup.object().shape({ username: Yup.string().required("Username required"), }),
      password: Yup.object().shape({ password: Yup.string().min(6, "Password must be at least 6 characters").required("Password required"), }),
      first_name: Yup.object().shape({ first_name: Yup.string().required("First name required"), }),
      last_name: Yup.object().shape({ last_name: Yup.string().required("Last name required"), }),
      email: Yup.object().shape({ email: Yup.string().email("Please enter a valid email address").required("Email required"), }),
    };

    loginSchema[e.target.name].isValid({ [e.target.name]: e.target.value })
      .then(valid => {
        if (valid) {
          this.setState({
            credentials: {
              ...this.state.credentials,
              [e.target.name]: e.target.value
            }
          });
        } else {
          console.log(valid);
        }
      })

  };

  login = e => {
    e.preventDefault();
    const loginSchema = Yup.object().shape({
      username: Yup.string().required("Username required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password required"),
      first_name: Yup.string().required("First name required"),
      last_name: Yup.string().required("Last name required"),
      email: Yup.string().email("Please enter a valid email address").required("Email required"),
    });
    console.log(this.state.credentials);
    loginSchema.isValid(this.state.credentials)
      .then(valid => {
        if (valid) {
          axiosWithAuth()
            .post('/signup', this.state.credentials)
            .then(res => {
              console.log("Successful signup");
              localStorage.setItem('token', res.data.payload);
              this.props.history.push('/dashboard');
            })
            .catch(err => console.log('Oh-oh, something wrong', err));
        } else {
          console.log("Is valid? ", valid);
        }
      })

  };


  render() {
    return (
      <Container text>
        <Header as='h2'>Welcome to the African Marketplace App!</Header>
        <Header as='h3'>Fill this from for new account</Header>
        <Form onSubmit={this.login}>
          <Form.Field>
            <label>Login</label>
            <input
              type="text"
              name="username"
              value={this.state.credentials.username}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.credentials.password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={this.state.credentials.first_name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={this.state.credentials.last_name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.credentials.email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type='submit'>Sign Up</Button>
        </Form>
      </Container>
    );
  }
};

export default Signup;
