import React from 'react';
import CommentSection from './CommentSection';

export default class ArticleSection extends React.Component {
  state = {
    mouseOnParagraph: 'default',
    commentsShown: false,
  };

  showComments = e => {
    e.preventDefault();
    this.setState({
      commentsShown: true,
    });
  };

  closeComments = e => {
    e.preventDefault();
    this.setState({
      commentsShown: false,
    });
  };

  colorHeatMap() {
    const { totalCommentCount, sectionCommentCount } = this.props;
    if (totalCommentCount == 0) return 'blue';
    const fraction = sectionCommentCount / totalCommentCount;
    let r = 255 * fraction * 7;
    if (r > 255) {
      r = 255;
    }
    return `rgba(${Math.round(r)}, 0, ${Math.round(255 - r)}, 1)`;
  }

  renderParagraph(text) {
    return (
      <p
        title="Click to show comments of this paragraph"
        className="article-section-content__p"
        onClick={this.showComments}
        style={{ cursor: this.state.commentsShown || 'pointer' }}
      >
        {text}
      </p>
    );
  }

  renderImage(image, caption) {
    return (
      <figure
        className="article__image"
        title="Click to show comments of this image"
        onClick={this.showComments}
        style={{ cursor: this.state.commentsShown || 'pointer' }}
      >
        <img src={image} alt={caption} />
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }

  renderIframe(iframe, caption) {
    return (
      <figure
        className="article__iframe"
        title="Click to show comments of this image"
        onClick={this.showComments}
        style={{ cursor: this.state.commentsShown || 'pointer' }}
      >
        <div className="aspect-ratio">
          <iframe src={iframe} frameBorder="0" allowFullScreen scrolling="no" />
        </div>
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }

  render() {
    const {
      heatMapOpen,
      text,
      caption,
      image,
      iframe,
      sectionId,
      comments,
    } = this.props;
    return (
      <div className="article-section">
        <div className="article-section-content">
          {iframe
            ? this.renderIframe(iframe, caption)
            : image
              ? this.renderImage(image, caption)
              : this.renderParagraph(text)}
          {heatMapOpen && (
            <div
              className="article-section-content__heat"
              style={{ backgroundColor: this.colorHeatMap() }}
            />
          )}
        </div>
        {this.state.commentsShown && (
          <button
            className="button button__comments"
            onClick={this.closeComments}
          >
            Close comments
          </button>
        )}
        {this.state.commentsShown && (
          <CommentSection sectionId={sectionId} comments={comments} />
        )}
      </div>
    );
  }
}
