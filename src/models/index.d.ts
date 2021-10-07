import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED"
}



type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostEditorMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly status: PostStatus | keyof typeof PostStatus;
  readonly rating?: number;
  readonly content?: string;
  readonly comments?: (Comment | null)[];
  readonly editors?: (PostEditor | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class Comment {
  readonly id: string;
  readonly postID: string;
  readonly content: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class PostEditor {
  readonly id: string;
  readonly post: Post;
  readonly editor: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PostEditor, PostEditorMetaData>);
  static copyOf(source: PostEditor, mutator: (draft: MutableModel<PostEditor, PostEditorMetaData>) => MutableModel<PostEditor, PostEditorMetaData> | void): PostEditor;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly posts?: (PostEditor | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}