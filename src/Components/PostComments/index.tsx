import React, { useEffect, useState } from "react";
// import { DataStore, SortDirection, Predicates } from "aws-amplify";
import { DataStore } from "aws-amplify";
import {
  Button,
  Header,
  Divider,
  // Dropdown,
  Icon,
  Input,
  List,
  ListItem,
  ListContent,
  ListHeader,
  ListDescription,
  // Modal,
} from "semantic-ui-react";
import { useStyles } from "./styles";
// import { Post, PostStatus } from "../../models";
import { Comment, Post } from "../../models";

// const statusOptions = [
//   {
//     key: "Draft",
//     text: "Draft",
//     value: PostStatus.DRAFT,
//   },
//   {
//     key: "Published",
//     text: "Published",
//     value: PostStatus.PUBLISHED,
//   },
// ];

type InitialFormState = {
  readonly content: string;
};

const initialFormState: InitialFormState = {
  content: "",
};

const initialPostState = {} as any;
const initialCommentsState: Array<Comment> = [];
// const initialFilteredPostsState: Array<Post> = [];

type PostCommentProps = {
  readonly postId: string;
};

const PostComments = ({ postId }: PostCommentProps) => {
  const [formState, setFormState] = useState(initialFormState);
  const [post, setPost] = useState(initialPostState);
  const [comments, setComments] = useState(initialCommentsState);
  // const [filteredPosts, setFilteredPosts] = useState(initialFilteredPostsState);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [filterNumber, setFilterNumber] = useState(0);

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

  // // TODO: get state here
  // async function fetchFilteredPosts(rating: number) {
  //   try {
  //     const posts = await DataStore.query(Post, (c) => c.rating("gt", rating));
  //     console.log(
  //       "Filtered posts retrieved successfully!",
  //       JSON.stringify(posts, null, 2)
  //     );
  //     setFilteredPosts(posts);
  //   } catch (error) {
  //     console.log("Error retrieving filtered posts", error);
  //   }
  // }

  // // TODO: get state here
  // async function fetchAscendingFilteredPosts(rating: number) {
  //   try {
  //     const posts = await DataStore.query(Post, (c) => c.rating("gt", rating), {
  //       sort: (s) =>
  //         s.rating(SortDirection.ASCENDING).title(SortDirection.DESCENDING),
  //     });

  //     console.log(
  //       "Filtered posts retrieved successfully!",
  //       JSON.stringify(posts, null, 2)
  //     );
  //     setFilteredPosts(posts);
  //   } catch (error) {
  //     console.log("Error retrieving filtered posts", error);
  //   }
  // }

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

  // async function editPostTitle(value: string, post: Post) {
  //   try {
  //     await DataStore.save(
  //       // Models in DataStore are immutable. To update a record you must use the
  //       // copyOf function to apply updates to the item's fields rather than
  //       // mutating the instance directly.
  //       Post.copyOf(post, (updated) => {
  //         updated.title = value;
  //       })
  //     );
  //   } catch (error) {
  //     console.log("Error editing post", error);
  //   } finally {
  //     // TODO:
  //     fetchPosts();
  //   }
  // }

  // async function editPostStatus(value: PostStatus, post: Post) {
  //   // const original = await DataStore.query(Post, post.id);
  //   try {
  //     await DataStore.save(
  //       // Models in DataStore are immutable. To update a record you must use the
  //       // copyOf function to apply updates to the item's fields rather than
  //       // mutating the instance directly.
  //       Post.copyOf(post, (updated) => {
  //         updated.status = value;
  //       })
  //     );
  //   } catch (error) {
  //     console.log("Error editing post", error);
  //   } finally {
  //     // TODO:
  //     fetchPosts();
  //   }
  // }

  // async function editPostRating(value: string, post: Post) {
  //   // const original = await DataStore.query(Post, post.id);
  //   try {
  //     await DataStore.save(
  //       // Models in DataStore are immutable. To update a record you must use the
  //       // copyOf function to apply updates to the item's fields rather than
  //       // mutating the instance directly.
  //       Post.copyOf(post, (updated) => {
  //         updated.rating = parseInt(value);
  //       })
  //     );
  //   } catch (error) {
  //     console.log("Error editing post", error);
  //   } finally {
  //     // TODO:
  //     fetchPosts();
  //   }
  // }

  // async function deletePost(postToDelete: Post) {
  //   // const original = await DataStore.query(Post, post.id);
  //   try {
  //     await DataStore.delete(postToDelete, (post) =>
  //       post.status("eq", PostStatus.DRAFT)
  //     );
  //   } catch (error) {
  //     console.log("Error deleting post", error);
  //   } finally {
  //     // TODO:
  //     fetchPosts();
  //   }
  // }

  // async function deleteAllPosts() {
  //   // const original = await DataStore.query(Post, post.title);
  //   try {
  //     await DataStore.delete(Post, Predicates.ALL);
  //   } catch (error) {
  //     console.log("Error deleting posts", error);
  //   } finally {
  //     // TODO:
  //     fetchPosts();
  //   }
  // }

  // // Hub
  // // useEffect(() => {
  // //   // Create listener
  // //   const listener = Hub.listen("datastore", async (hubData) => {
  // //     const { event, data } = hubData.payload;
  // //     console.log("Hub event:", event);
  // //     console.log("Hub data:", data);
  // //   });

  // //   // Remove listener
  // //   return listener;
  // // }, []);

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
        {/* <Button onClick={() => deleteAllPosts()}>Delete All Posts</Button> */}
        {/* <Divider /> */}
        <Input
          onChange={(event) => setInput("content", event.target.value)}
          value={formState?.content}
          placeholder="Content"
        />
        <Button onClick={addComment}>Create Comment</Button>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={comment.id ? comment.id : index}>
              {/* <ListContent floated="right">
                <Button onClick={() => removeTodo(todo)} icon circular>
                  <Icon name="delete" color="red" />
                </Button>
              </ListContent> */}
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
