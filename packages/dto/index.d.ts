export type Id = string;

export type Indexed<T> = T & {
  _id?: Id;
}

export interface DtoWrapper<T> {
  data: Indexed<T>[];
  metadata: {
    count?: number;
    error?: string;
  }
}

export interface BlogPostComment {
  gravatarHash: string;
  name: string;
  text: string;
  timestamp: string;
}

export interface BlogPost {
  author: string;
  comments: BlogPostComment[];
  tags: string[];
  text: string;
  title: string;
}

export interface User {
  emailAddress: string;
  name: string;
}

export interface UserCreate {
  emailAddress: string;
  name?: string;
  password: string;
}

export interface Settings {
  name: string;
}
