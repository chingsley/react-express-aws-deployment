import React, { Component } from "react";
import { connect } from "react-redux";

import * as ACTIONS from "../store/actions/actions";
import axios from "axios";
import history from "../utils/history";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const RenderComments = (comment) => (
  <div>
    <h3>{comment.comment.comment}</h3>
    <small>{comment.comment.date_created}</small>
    <p>By: {comment.comment.author}</p>
    {comment.cur_user_id === comment.comment.user_id ? (
      <Button
        onClick={() =>
          this.handleClickOpen(comment.comment.cid, comment.comment.comment)
        }
      >
        Edit
      </Button>
    ) : null}
  </div>
);

class ShowPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      comment: "",
      cid: "",
    };
  }

  handleClickOpen = (cid, comment) =>
    this.setState({ open: true, comment: comment, cid: cid });

  handleClose = () => this.setState({ open: false, comment: "", cid: "" });

  handleCommentChange = () => this.setState({ comment: event.target.value });

  render() {
    return (
      <div>
        <div>
          <h2>Post</h2>
          <h4>{this.props.location.state.post.post.title}</h4>
          <p>{this.props.location.state.post.post.body}</p>
          <p>{this.props.location.state.post.post.author}</p>
        </div>
        <div>
          <h2>Comments: </h2>
          {this.props.comments
            ? this.props.comments.map((comment) => (
                <RenderComments
                  comment={comment}
                  cur_user_id={this.props.db_profile[0].uid}
                  key={comment.cid}
                />
              ))
            : null}
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <TextField id="comment" label="comment" margin="normal" />
            <br />
            <Button type="submit">Submit</Button>
          </form>
        </div>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitile id="alert-dialog-title">Edit comment</DialogTitile>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <input
                  type="text"
                  value={this.state.comment}
                  onChange={this.handleCommentChange}
                />
              </DialogContentText>
              <DialogActions>
                <Button
                  onClick={() => {
                    this.handleUpdate();
                    this.setState({ open: false });
                  }}
                >
                  Agree
                </Button>
                <Button onClick={() => this.handleClose()}>Cancel</Button>
                <Button onClick={() => this.handleDeleteComment()}>
                  Delete
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.posts_reducr.comments,
    db_profile: state.auth_reducer.db_profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
