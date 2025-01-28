import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderRateDisplayComponent } from '@rapider/angular-components/rate-display';
import { Comment } from '@rapider/angular-components/core/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCommentModule } from 'ng-zorro-antd/comment';


@Component({
  selector: 'rappider-comment',
  standalone: true,
  imports: [
    CommonModule,
    NzCommentModule,
    NzAvatarModule,
    NzToolTipModule,
    NzIconModule,
    RappiderRateDisplayComponent,
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class RappiderCommentComponent {

  /**
   * displays the omments section
   *
   * @type {Comment[]}
   * @memberof RappiderCommentComponent
   */
  @Input() comments: Comment[];

  @Input() likeButtonColor: string;
  @Input() dislikeButtonColor: string;

  /**
   * displays the like click
   *
   * @memberof RappiderCommentComponent
   */
  @Output() likeClick = new EventEmitter<Comment>();

  /**
   * displays the dislike click
   *
   * @memberof RappiderCommentComponent
   */
  @Output() dislikeClick = new EventEmitter<Comment>();
  /**
   * displays the reply to click
   *
   * @memberof RappiderCommentComponent
   */
  @Output() replyToClick = new EventEmitter<Comment>();

  initialLevel = 0;

  onLikeClick(likedNode: Comment) {
    this.comments = this.changeCommentLikeCount(this.comments, likedNode);
    this.comments = [...this.comments];
    this.likeClick.emit(likedNode);
  }

  onDislikeClick(dislikedNode: Comment) {
    this.comments = this.changeCommentDislikeCount(this.comments, dislikedNode);
    this.comments = [...this.comments];
    this.dislikeClick.emit(dislikedNode);
  }

  onReplyToClick(replyToNode: Comment) {
    this.replyToClick.emit(replyToNode);
  }

  changeCommentLikeCount(comments: Comment[], likedComment: Comment) {
    const updatedComments = comments.map(comment => {
      if (comment === likedComment) {
        if (!comment.isDisliked && !comment.isLiked) {
          return {
            ...comment,
            likeCount: (Number(likedComment.likeCount) + Number(1)),
            isLiked: true
          };
        } else if (comment.isDisliked && !comment.isLiked) {
          return {
            ...comment,
            likeCount: (Number(likedComment.likeCount) + Number(1)),
            isLiked: true,
            dislikeCount: (Number(likedComment.dislikeCount) - Number(1)),
            isDisliked: false
          };
        } else if (!comment.isDisliked && comment.isLiked) {
          return {
            ...comment,
            likeCount: (Number(likedComment.likeCount) - Number(1)),
            isLiked: false,
          };
        }
      } else {
        if (!comment.children) {
          return {
            ...comment
          };
        } else {
          return {
            ...comment,
            children: this.changeCommentLikeCount(comment.children, likedComment)
          };
        }
      }
    });
    return updatedComments;
  }

  changeCommentDislikeCount(comments: Comment[], dislikedComment: Comment) {
    const updatedComments = comments.map(comment => {
      if (comment === dislikedComment) {
        if (!comment.isDisliked && !comment.isLiked) {
          return {
            ...comment,
            dislikeCount: (Number(dislikedComment.dislikeCount) + Number(1)),
            isDisliked: true
          };
        } else if (comment.isDisliked && !comment.isLiked) {
          return {
            ...comment,
            dislikeCount: (Number(dislikedComment.dislikeCount) - Number(1)),
            isDisliked: false
          };
        } else if (!comment.isDisliked && comment.isLiked) {
          return {
            ...comment,
            dislikeCount: (Number(dislikedComment.dislikeCount) + Number(1)),
            isDisliked: true,
            likeCount: (Number(dislikedComment.likeCount) - Number(1)),
            isLiked: false
          };
        }
      } else {
        if (!comment.children) {
          return {
            ...comment
          };
        } else {
          return {
            ...comment,
            children: this.changeCommentDislikeCount(comment.children, dislikedComment)
          };
        }
      }
    });
    return updatedComments;
  }

}
