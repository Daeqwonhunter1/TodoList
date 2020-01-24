import React, { Component } from 'react';
import {   withRouter } from 'react-router-dom';
import { createPost, updatePost, deletePost } from '../services/api-helper'
import { ListGroup, Modal, Button } from 'react-bootstrap'
import CreatePostlist from "./CreatePostlist"
import UpdatePostList from "./UpdatePostList"

class PostList extends Component {
  state = {
    postList: [],
    showModal: false,
    postsId: null,
    postsTitle: null,
    postsDescription: null,

  }




  createPost = async (info) => {
    await createPost(info);
    this.setState({
      showModal: false
    })
    this.props.history.push('/posts')
  }

  updatePost = async (postId, data) => {
    await updatePost(postId, data);
    this.props.history.push('/posts')
  }

  deletePost = async (postId) => {
    await deletePost(postId)
    this.props.history.push('/posts')
  }


  makeTrue = (postId, postTitle, postDescription) => {
    this.setState({
      showModal: true,
      postsId: postId,
      postsTitle: postTitle,
      postsDescription: postDescription,

    })
  }

  makeTrue2 = () => {
    this.setState({
      showModal: true,
      postsTitle: null,
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }


  render() {

    return (
      <>
        <button className="task-button" onClick={this.makeTrue2}>Add Task</button>

        <div id="PostDiv">
          {
            this.props.postlist && this.props.postlist.map(posts => (
              <div id="posts" key={posts._id}>
                {this.props.currentUser && posts.userId == this.props.currentUser.id ?
                  <ListGroup >
                    <ListGroup.Item action onClick={() => {
                      this.makeTrue(posts._id, posts.title, posts.description)
                    }} >
                      {posts.title}
                    </ListGroup.Item>
                  </ListGroup>
                  :
                  false
                }

              </div>
            ))
          }
          {this.state.postsTitle !== null ?
            <>
              <Modal show={this.state.showModal} onHide={this.handleClose} >
                <Modal.Header closeButton>
                  <Modal.Title className = "PostTitle">
                    {this.state.postsTitle}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {this.state.postsDescription}
                </Modal.Body>
                <Modal.Footer>
                  <UpdatePostList
                    updatePost={this.updatePost}
                    postId={this.state.postsId}
                  />
                  <Button className = "btn" variant="secondary" size="lg" active onClick={() => {
                    this.deletePost(this.state.postsId)
                  }}>
                    Delete
             </Button>
                 
                </Modal.Footer>
              </Modal>
            </>
            :
            <Modal show={this.state.showModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <CreatePostlist
                    postId={this.state.postsId}
                    createPost={this.createPost}
                    handlePostListChange={this.handlePostListChange}
                    postsFormData={this.state.postsFormData}
                  />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" size="lg" active onClick={this.handleClose}>
                  Close
             </Button>
              </Modal.Footer>
            </Modal>
          }
        </div>
      </>
    );
  }
}

export default withRouter(PostList);