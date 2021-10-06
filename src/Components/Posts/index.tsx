import React, { useEffect, useState } from "react";
import { API, graphqlOperation, Hub } from "aws-amplify";
import { createPost, deletePost } from "../../graphql/mutations";
import { listPosts } from "../../graphql/queries";
import {
  Button,
  Header,
  Icon,
  Input,
  List,
  ListItem,
  ListContent,
  ListHeader,
  ListDescription,
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import { onCreatePost, onDeletePost } from "../../graphql/subscriptions";
import { useStyles } from "./styles";
// import { Post as PostModel } from "../../models";

type Post = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
};

type InitialState = {
  readonly name: string;
  readonly description: string;
};
const initialState: InitialState = { name: "", description: "" };
const initialPostState: Array<Post> = [];

const Posts = () => {
  const [formState, setFormState] = useState(initialState);
  const [posts, setPosts] = useState(initialPostState);

  const { container, parentContainer } = useStyles();

  useEffect(() => {
    fetchPosts();
  }, []);

  // Subscribe to onCreate updates
  useEffect(() => {
    // https://github.com/aws-amplify/amplify-js/issues/7589
    // @ts-ignore
    const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
      // Post: add type
      next: (postData: any) => {
        console.log(postData);
        const Post = postData?.value?.data?.onCreatePost;

        // Only add Post if it doesn't already exist in state (i.e. another user)
        if (posts.filter((t) => t.id === Post.id).length === 0) {
          setPosts([...posts, Post]);
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    return subscription.unsubscribe;
  }, []);

  // Subscribe to onDelete updates
  useEffect(() => {
    // https://github.com/aws-amplify/amplify-js/issues/7589
    // @ts-ignore
    const subscription = API.graphql(graphqlOperation(onDeletePost)).subscribe({
      // Post: add type
      next: (postData: any) => {
        console.log(postData);
        const Post = postData?.value?.data?.onDeletePost;
        // Post: don't always perform this operation (i.e. another user has removed Post)
        setPosts(posts.filter((t) => t.id !== Post.id));
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  // DataStore subscription
  // useEffect(() => {
  //   function handleSubscriptionUpdate(msg: any) {
  //     if (msg.opType === "DELETE") {
  //       setPosts((posts) => posts.filter((t) => t.id !== msg.element.id));
  //     } else if (msg.opType === "INSERT") {
  //       setPosts((posts) => [...posts, msg.element]);
  //     }
  //   }
  //   const subscription = DataStore.observe(PostModel).subscribe((msg) => {
  //     handleSubscriptionUpdate(msg);
  //   });
  //   return subscription.unsubscribe;
  // }, []);

  useEffect(() => {
    // Create listener
    const listener = Hub.listen("datastore", async (hubData) => {
      const { event, data } = hubData.payload;
      console.log("Hub event:", event);
      console.log("Hub data:", data);
    });

    // Remove listener
    return listener;
  }, []);

  function setInput(key: string, value: string) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchPosts() {
    try {
      const postData: any = await API.graphql(graphqlOperation(listPosts));
      const posts = postData.data.listPosts.items;
      // const posts: any = await DataStore.query(PostModel);
      setPosts(posts);
    } catch (err) {
      console.log("error fetching posts");
    }
  }

  async function addPost() {
    try {
      if (!formState.name || !formState.description) return;

      // Generate id so that you can optimistically update state, while still allowing
      // for update and delete, since those require ids. Alternative is to fetch
      // on each operation, but that's slow.
      // const postId = uuidv4();

      const Post = { id: uuidv4(), ...formState };

      setFormState(initialState);

      await API.graphql(graphqlOperation(createPost, { input: { ...Post } }));
      // await DataStore.save(
      //   new PostModel({
      //     ...Post,
      //   })
      // );
    } catch (err) {
      // If there was an error, fetch posts because local state is not correct
      fetchPosts();
      console.log("error creating Post:", err);
    }
  }

  // Post:
  // /* update a Post */
  // await API.graphql(
  //   graphqlOperation(updatePost, {
  //     input: { id: postId, name: "Updated Post info" },
  //   })
  // );

  async function removePost(Post: any) {
    try {
      setPosts(posts.filter((t) => t.id !== Post.id));
      await API.graphql(
        graphqlOperation(deletePost, { input: { id: Post.id } })
      );
      // await DataStore.delete(Post);
    } catch (err) {
      // If there was an error, fetch posts because local state is not correct
      fetchPosts();
      console.log("error deleting Post:", err);
    }
  }

  return (
    <div className={parentContainer}>
      <div className={container}>
        <Header as="h1" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>My Posts</Header.Content>
          <Header sub>Amplify GraphQL API Demo</Header>
        </Header>
        <Input
          onChange={(event) => setInput("name", event.target.value)}
          value={formState.name}
          placeholder="Name"
        />
        <Input
          onChange={(event) => setInput("description", event.target.value)}
          value={formState.description}
          placeholder="Description"
        />
        <Button onClick={addPost}>Create Post</Button>
        <List>
          {posts.map((Post, index) => (
            <ListItem key={Post.id ? Post.id : index}>
              <ListContent floated="right">
                <Button onClick={() => removePost(Post)} icon circular>
                  <Icon name="delete" color="red" />
                </Button>
              </ListContent>
              <ListContent>
                <ListHeader>
                  <p>{Post.name}</p>
                </ListHeader>
                <ListDescription>
                  <p>{Post.description}</p>
                </ListDescription>
              </ListContent>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Posts;
