import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import {
  Button,
  Header,
  Divider,
  Icon,
  Input,
  List,
  ListItem,
  ListContent,
  ListHeader,
  ListDescription,
} from "semantic-ui-react";
import { useStyles } from "./styles";
import { Comment, Post } from "../../models";

type InitialFormState = {
  readonly content: string;
};

const initialFormState: InitialFormState = {
  content: "",
};

const initialPostState = {} as any;
const initialCommentsState: Array<Comment> = [];

type PostCommentProps = {
  readonly postId: string;
};

const PostComments = ({ postId }: PostCommentProps) => {
  const [formState, setFormState] = useState(initialFormState);
  const [post, setPost] = useState(initialPostState);
  const [comments, setComments] = useState(initialCommentsState);

  const { container, parentContainer } = useStyles();

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  function setInput(key: string, value: string | number) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchPost() {
    try {
      const post = await DataStore.query(Post, postId);
      console.log(
        "Post retrieved successfully!",
        JSON.stringify(post, null, 2)
      );
      setPost(post);
    } catch (error) {
      console.log("Error retrieving post", error);
    }
  }

  async function fetchComments() {
    try {
      // TODO: Is there a way to do this in the query itself?
      const comments = (await DataStore.query(Comment)).filter(
        (c) => c.postID === postId
      );
      console.log(
        "Comments retrieved successfully!",
        JSON.stringify(post, null, 2)
      );
      setComments(comments);
    } catch (error) {
      console.log("Error retrieving comments", error);
    }
  }

  async function addComment() {
    try {
      if (!formState.content) return;
      await DataStore.save(
        new Comment({
          content: formState.content,
          postID: postId,
        })
      );
      console.log("Comment saved successfully!");
    } catch (error) {
      console.log("Error saving comment", error);
    } finally {
      // TODO:
      fetchComments();
    }
  }

  return (
    <div className={parentContainer}>
      <div className={container}>
        <Header as="h1" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>{[post?.title]}</Header.Content>
          <Header sub>{post?.rating}</Header>
          <Header sub>{post?.status}</Header>
        </Header>
        <Divider />
        <Input
          onChange={(event) => setInput("content", event.target.value)}
          value={formState?.content}
          placeholder="Content"
        />
        <Button onClick={addComment}>Create Comment</Button>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={comment.id ? comment.id : index}>
              <ListContent>
                <ListHeader>
                  <p>{comment?.content}</p>
                </ListHeader>
                <ListDescription>
                  <p>{comment?.updatedAt}</p>
                </ListDescription>
              </ListContent>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default PostComments;
