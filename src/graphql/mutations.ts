/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      status
      rating
      content
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      editors {
        items {
          id
          postID
          editorID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      status
      rating
      content
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      editors {
        items {
          id
          postID
          editorID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      status
      rating
      content
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      editors {
        items {
          id
          postID
          editorID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      postID
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      postID
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      postID
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPostEditor = /* GraphQL */ `
  mutation CreatePostEditor(
    $input: CreatePostEditorInput!
    $condition: ModelPostEditorConditionInput
  ) {
    createPostEditor(input: $input, condition: $condition) {
      id
      postID
      editorID
      post {
        id
        title
        status
        rating
        content
        comments {
          nextToken
        }
        editors {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      editor {
        id
        username
        posts {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePostEditor = /* GraphQL */ `
  mutation UpdatePostEditor(
    $input: UpdatePostEditorInput!
    $condition: ModelPostEditorConditionInput
  ) {
    updatePostEditor(input: $input, condition: $condition) {
      id
      postID
      editorID
      post {
        id
        title
        status
        rating
        content
        comments {
          nextToken
        }
        editors {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      editor {
        id
        username
        posts {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePostEditor = /* GraphQL */ `
  mutation DeletePostEditor(
    $input: DeletePostEditorInput!
    $condition: ModelPostEditorConditionInput
  ) {
    deletePostEditor(input: $input, condition: $condition) {
      id
      postID
      editorID
      post {
        id
        title
        status
        rating
        content
        comments {
          nextToken
        }
        editors {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      editor {
        id
        username
        posts {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      posts {
        items {
          id
          postID
          editorID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      posts {
        items {
          id
          postID
          editorID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      posts {
        items {
          id
          postID
          editorID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
