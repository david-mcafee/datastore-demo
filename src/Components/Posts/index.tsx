import React, { useEffect, useState } from "react";
import { DataStore, Hub } from "aws-amplify";
import {
  Button,
  Header,
  Dropdown,
  Icon,
  Input,
  List,
  ListItem,
  ListContent,
  ListHeader,
  ListDescription,
} from "semantic-ui-react";
import { useStyles } from "./styles";
import { Post, PostStatus } from "../../models";

const statusOptions = [
  {
    key: "Draft",
    text: "Draft",
    value: PostStatus.DRAFT,
  },
  {
    key: "Published",
    text: "Published",
    value: PostStatus.PUBLISHED,
  },
];

type InitialState = {
  readonly title: string;
  readonly status: PostStatus;
};
const initialState: InitialState = { title: "", status: PostStatus.DRAFT };
const initialPostState: Array<Post> = [];

const Posts = () => {
  const [formState, setFormState] = useState(initialState);
  const [posts, setPosts] = useState(initialPostState);

  const { container, parentContainer } = useStyles();

  useEffect(() => {
    fetchPosts();
  }, []);

  function setInput(key: string, value: string) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchPosts() {
    try {
      const posts = await DataStore.query(Post);
      console.log(
        "Posts retrieved successfully!",
        JSON.stringify(posts, null, 2)
      );
      setPosts(posts);
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  }

  async function addPost() {
    try {
      if (!formState.title || !formState.status) return;
      await DataStore.save(
        new Post({
          title: formState?.title,
          status: formState?.status,
        })
      );
      console.log("Post saved successfully!");
    } catch (error) {
      console.log("Error saving post", error);
    }
  }

  async function editPostTitle(value: string, post: Post) {
    try {
      await DataStore.save(
        Post.copyOf(post, (updated) => {
          updated.title = value;
        })
      );
    } catch (error) {
      console.log("Error editing post", error);
    }
  }

  async function editPostStatus(value: PostStatus, post: Post) {
    try {
      await DataStore.save(
        Post.copyOf(post, (updated) => {
          updated.status = value;
        })
      );
    } catch (error) {
      console.log("Error editing post", error);
    }
  }

  // Hub
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

  return (
    <div className={parentContainer}>
      <div className={container}>
        <Header as="h1" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>My Posts</Header.Content>
          <Header sub>Amplify DataStore Demo (Subject to frequent bugs)</Header>
        </Header>
        <Input
          onChange={(event) => setInput("title", event.target.value)}
          value={formState.title}
          placeholder="Title"
        />
        <Dropdown
          placeholder="Select Status"
          fluid
          selection
          options={statusOptions}
          onChange={(event, data) => {
            setInput("status", data.value as PostStatus);
          }}
        />
        <Button onClick={addPost}>Create Post</Button>
        <List>
          {posts.map((post, index) => (
            <ListItem key={post.id ? post.id : index}>
              <ListContent floated="right">
                <Button onClick={() => console.log("test")} icon circular>
                  <Icon name="delete" color="red" />
                </Button>
              </ListContent>
              <ListContent>
                <ListHeader>
                  <Input
                    onChange={(event) =>
                      editPostTitle(event.target.value, post)
                    }
                    value={post.title}
                  />
                </ListHeader>
                <ListDescription>
                  <Dropdown
                    placeholder="Select Status"
                    fluid
                    selection
                    options={statusOptions}
                    onChange={(event, data) =>
                      editPostStatus(data.value as PostStatus, post)
                    }
                    value={post.status}
                  />
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
