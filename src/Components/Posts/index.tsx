import React, { useEffect, useState } from "react";
import { DataStore, SortDirection, Predicates } from "aws-amplify";
import {
  Button,
  Header,
  Divider,
  Dropdown,
  Icon,
  Input,
  List,
  ListItem,
  ListContent,
  ListHeader,
  ListDescription,
  Modal,
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
  readonly rating: number;
  readonly status: PostStatus;
};

const initialState: InitialState = {
  title: "",
  rating: 0,
  status: PostStatus.DRAFT,
};

const initialPostState: Array<Post> = [];
const initialFilteredPostsState: Array<Post> = [];

const Posts = () => {
  const [formState, setFormState] = useState(initialState);
  const [posts, setPosts] = useState(initialPostState);
  const [filteredPosts, setFilteredPosts] = useState(initialFilteredPostsState);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterNumber, setFilterNumber] = useState(0);

  const { container, parentContainer } = useStyles();

  useEffect(() => {
    fetchPosts();
  }, []);

  function setInput(key: string, value: string | number) {
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

  // TODO: get state here
  async function fetchFilteredPosts(rating: number) {
    try {
      const posts = await DataStore.query(Post, (c) => c.rating("gt", rating));
      console.log(
        "Filtered posts retrieved successfully!",
        JSON.stringify(posts, null, 2)
      );
      setFilteredPosts(posts);
    } catch (error) {
      console.log("Error retrieving filtered posts", error);
    }
  }

  // TODO: get state here
  async function fetchAscendingFilteredPosts(rating: number) {
    try {
      const posts = await DataStore.query(Post, (c) => c.rating("gt", rating), {
        sort: (s) =>
          s.rating(SortDirection.ASCENDING).title(SortDirection.DESCENDING),
      });

      console.log(
        "Filtered posts retrieved successfully!",
        JSON.stringify(posts, null, 2)
      );
      setFilteredPosts(posts);
    } catch (error) {
      console.log("Error retrieving filtered posts", error);
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
    } finally {
      // TODO:
      fetchPosts();
    }
  }

  async function editPostTitle(value: string, post: Post) {
    try {
      await DataStore.save(
        // Models in DataStore are immutable. To update a record you must use the
        // copyOf function to apply updates to the item's fields rather than
        // mutating the instance directly.
        Post.copyOf(post, (updated) => {
          updated.title = value;
        })
      );
    } catch (error) {
      console.log("Error editing post", error);
    } finally {
      // TODO:
      fetchPosts();
    }
  }

  async function editPostStatus(value: PostStatus, post: Post) {
    // const original = await DataStore.query(Post, post.id);
    try {
      await DataStore.save(
        // Models in DataStore are immutable. To update a record you must use the
        // copyOf function to apply updates to the item's fields rather than
        // mutating the instance directly.
        Post.copyOf(post, (updated) => {
          updated.status = value;
        })
      );
    } catch (error) {
      console.log("Error editing post", error);
    } finally {
      // TODO:
      fetchPosts();
    }
  }

  async function editPostRating(value: string, post: Post) {
    // const original = await DataStore.query(Post, post.id);
    try {
      await DataStore.save(
        // Models in DataStore are immutable. To update a record you must use the
        // copyOf function to apply updates to the item's fields rather than
        // mutating the instance directly.
        Post.copyOf(post, (updated) => {
          updated.rating = parseInt(value);
        })
      );
    } catch (error) {
      console.log("Error editing post", error);
    } finally {
      // TODO:
      fetchPosts();
    }
  }

  async function deletePost(postToDelete: Post) {
    // const original = await DataStore.query(Post, post.id);
    try {
      await DataStore.delete(postToDelete, (post) =>
        post.status("eq", PostStatus.DRAFT)
      );
    } catch (error) {
      console.log("Error deleting post", error);
    } finally {
      // TODO:
      fetchPosts();
    }
  }

  async function deleteAllPosts() {
    // const original = await DataStore.query(Post, post.title);
    try {
      await DataStore.delete(Post, Predicates.ALL);
    } catch (error) {
      console.log("Error deleting posts", error);
    } finally {
      // TODO:
      fetchPosts();
    }
  }

  // Hub
  // useEffect(() => {
  //   // Create listener
  //   const listener = Hub.listen("datastore", async (hubData) => {
  //     const { event, data } = hubData.payload;
  //     console.log("Hub event:", event);
  //     console.log("Hub data:", data);
  //   });

  //   // Remove listener
  //   return listener;
  // }, []);

  return (
    <div className={parentContainer}>
      <div className={container}>
        <Header as="h1" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>My Posts</Header.Content>
          <Header sub>Amplify DataStore Demo</Header>
          <Header sub>
            When deleteting individual posts, only those in "Draft" can be
            deleted
          </Header>
        </Header>
        <Modal
          onClose={() => {
            setFilterNumber(0);
            setFilteredPosts([]);
            setModalOpen(false);
          }}
          onOpen={() => {
            fetchFilteredPosts(0);
            setModalOpen(true);
          }}
          open={modalOpen}
          trigger={<Button>Show filtered results in modal</Button>}
        >
          <Modal.Header>Filtered results</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Filter results here</Header>
            </Modal.Description>
            <Input
              onChange={(event) =>
                setFilterNumber(parseInt(event.target.value))
              }
              value={filterNumber}
              placeholder="Filter Number"
            />
            <Button onClick={() => fetchFilteredPosts(filterNumber)}>
              Fetch filtered results
            </Button>
            <Button onClick={() => fetchAscendingFilteredPosts(filterNumber)}>
              Ascending
            </Button>
            <List>
              {filteredPosts.map((post, index) => (
                <ListItem key={post.id ? post.id : index}>
                  <ListContent>
                    <ListHeader>
                      <p>{post.title}</p>
                    </ListHeader>
                    <ListDescription>
                      <p>{post.status}</p>
                    </ListDescription>
                    <ListDescription>
                      <p>{post.rating}</p>
                    </ListDescription>
                  </ListContent>
                </ListItem>
              ))}
            </List>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => setModalOpen(false)}>
              Done!
            </Button>
            <Button
              content="Yep"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setModalOpen(false)}
              positive
            />
          </Modal.Actions>
        </Modal>
        <Divider />
        <Button onClick={() => deleteAllPosts()}>Delete All Posts</Button>
        <Divider />
        <Input
          onChange={(event) => setInput("title", event.target.value)}
          value={formState.title}
          placeholder="Title"
        />
        <Input
          onChange={(event) => setInput("rating", parseInt(event.target.value))}
          value={formState.rating}
          placeholder="Rating"
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
                <Button onClick={() => deletePost(post)} icon circular>
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
                  <Input
                    onChange={(event) =>
                      editPostRating(event.target.value, post)
                    }
                    value={post.rating}
                  />
                </ListDescription>
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
