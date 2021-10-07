/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String!) {
    onCreatePost(owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String!) {
    onUpdatePost(owner: $owner) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String!) {
    onDeletePost(owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String!) {
    onCreateComment(owner: $owner) {
      id
      postID
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String!) {
    onUpdateComment(owner: $owner) {
      id
      postID
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String!) {
    onDeleteComment(owner: $owner) {
      id
      postID
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreatePostEditor = /* GraphQL */ `
  subscription OnCreatePostEditor {
    onCreatePostEditor {
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
export const onUpdatePostEditor = /* GraphQL */ `
  subscription OnUpdatePostEditor {
    onUpdatePostEditor {
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
export const onDeletePostEditor = /* GraphQL */ `
  subscription OnDeletePostEditor {
    onDeletePostEditor {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
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
