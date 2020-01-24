import React, { Component } from 'react';
import PostList from './PostList'
import { Route, withRouter } from 'react-router-dom';

import { showPosts } from '../services/api-helper'


class PostContainer extends Component {
  state = {
    currentPostList: null,
    postList: [],
    postListFormData: {
      title: null,
      description: null,
    }
  }


  componentDidMount() {
    this.getAllPosts()
  }



  ///Read///
  getAllPosts = async () => {
    const postList = showPosts().then(result => this.setState({
      postList: result
    }))
  }

  


  render() {
    return (
      <div>

        {/* Read All Posts */}

        <Route exact path="/posts" render={() => (<PostList getAllPosts={this.getAllPosts}
          postlist={this.state.postList}
          currentUser={this.props.currentUser} />)} />

      
      </div>
    );
  }
}

export default withRouter(PostContainer);