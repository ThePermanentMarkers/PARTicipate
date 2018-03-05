import React from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';

export default class CommentSection extends React.Component {
  render() {
    const { comments, sectionId } = this.props;

    return (
      <section className="comment-section">
        <CommentForm sectionId={sectionId} />
        <div className="comment-section__comments">
          {comments.map((comment, i) => (
            <Comment key={i} sectionId={sectionId} commentId={i} {...comment} />
          ))}
        </div>
      </section>
    );
  }
}
