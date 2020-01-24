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
    console.log(this.state)
    return (
      
      <div id="postForm">
      
        <Form className="create-post" onSubmit={(e) => {
          e.preventDefault();
          
          this.props.updatePost(this.props.postId,this.state)


        }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Text className="text-muted">
              Update Your Task
        </Form.Text>

            <Form.Control className="update-input-fields"
              type="text"
              name="title"
              placeholder="title"
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control as="textarea" rows="3" className="update-input-fields"
              type="text"
              name="description"
              placeholder="description"
              onChange={this.handleChange} />
          </Form.Group>
          <Button className = "sub" variant="secondary" type="submit">
            Submit
        </Button>


        </Form>
      </div>
    )
  }
}