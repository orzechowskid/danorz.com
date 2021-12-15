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
  timestamp: string; /* ISO-8601 */
}

export interface BlogPost {
  author: string;
  comments: BlogPostComment[];
  tags: string[];
  text: string;
  timestamp: string; /* ISO-8601 */
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
  values: Record<string, any>;
}

export type Timestamp = ReturnType<typeof Date.prototype.toISOString>;

export type SiteBannerData = Indexed<{
  bannerDismissable: boolean;
  bannerSeverity: 'info' | 'warning';
  bannerText: string;
  dismissed: boolean;
}>;

export interface GalleryItem {
  description?: string;
  mimeType: string;
  path: string;
  thumbnailPath: string;
  timestamp: string; /* ISO-8601 */
}

export interface PhotoGallery {
  items: GalleryItem[];
  name: string;
}
