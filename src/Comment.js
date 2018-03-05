import React from 'react';
import CommentSource from './CommentSource';

export default class Comment extends React.Component {
  render() {
    const { sectionId, commentId, author, text, sources } = this.props;

    return (
      <div className="comment">
        <header className="comment__author">Comment by User #{author}</header>
        <p className="comment__text">{text}</p>
        {sources.length > 0 && (
          <footer className="comment__sources">
            <header className="comment__sources__title">Sources</header>
            {sources.map((source, i) => (
              <CommentSource
                sectionId={sectionId}
                commentId={commentId}
                sourceId={i}
                key={i}
                {...source}
              />
            ))}
          </footer>
        )}
      </div>
    );
  }
}
