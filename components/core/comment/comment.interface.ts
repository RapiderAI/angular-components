export interface Comment {
  author: string;
  avatar: string;
  createdDate: Date;
  content: string;
  likeCount: number;
  dislikeCount: number;
  children?: Comment[];
  replyText?: string;
  rate?: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}
