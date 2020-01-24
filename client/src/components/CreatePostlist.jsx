import React from 'react'
import { Form, Button } from 'react-bootstrap'






export default class CreatePostlist extends React.Component {
  state = {

  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }


  render() {

    return (
      
      <div id="postForm">
        <Form className="create-form" onSubmit={(e) => {
          e.preventDefault();
          
          this.props.createPost(this.state)
        }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Text className="text-muted">
              Create A new Task
            </Form.Text>

            <Form.Control className="create-input-fields"
              type="text"
              name="title"
              placeholder="title"
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control as="textarea" rows="3" className="create-input-fields"
              type="text"
              name="description"
              placeholder="description"
              onChange={this.handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
        </Button>


        </Form>
      </div>
    )
  }
}