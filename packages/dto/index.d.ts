export type Id = string;
export type Timestamp = ReturnType<typeof Date.prototype.toISOString>;

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
  timestamp: Timestamp;
}

export interface BlogPost {
  author: string;
  comments: BlogPostComment[];
  tags: string[];
  text: string;
  timestamp: Timestamp;
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

interface BooleanValue {
  type: 'boolean';
  value: boolean;
}

interface StringValue {
  type: 'string';
  value: string;
}

export interface SiteSettings {
  name: 'site';
  values: {
    offline: BooleanValue;
    site: {
      title: StringValue;
    };
  };
}

export interface SettingsUpdate {
  path: string;
  value: any;
}

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
  timestamp: Timestamp;
}

export interface PhotoGallery {
  items: GalleryItem[];
  name: string;
}

export type RemotePeerRequestStatus = "requested" | "awaitingVerification";

export interface RemotePeerRequest {
  status: RemotePeerRequestStatus;
  timestamp: Timestamp;
  url: string;
}

export interface RemotePeer {
  timestamp: Timestamp;
  url: string;
}
