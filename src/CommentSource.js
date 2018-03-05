import React from 'react';
import data from './data';

export default class CommentSource extends React.Component {
  onUpVote = () => {
    const { sectionId, commentId, sourceId } = this.props;
    data.upVoteSource(sectionId, commentId, sourceId);
  };

  onDownVote = () => {
    const { sectionId, commentId, sourceId } = this.props;
    data.downVoteSource(sectionId, commentId, sourceId);
  };

  render() {
    const { href, upVotes, downVotes } = this.props;

    const totalVotes = upVotes + downVotes;
    const fraction = upVotes / totalVotes;
    const isGood = totalVotes >= 10 && fraction > 2 / 3;
    const isBad = totalVotes >= 10 && fraction < 1 / 3;

    let linkClassName = 'comment-source__link';
    if (isGood) {
      linkClassName += ' comment-source__link--good';
    } else if (isBad) {
      linkClassName += ' comment-source__link--bad';
    }

    let title = 'This source has not been verified yet';
    if (isGood) {
      title =
        'This source has been marked as "good" by the majority of readers';
    } else if (isBad) {
      title = 'This source has been marked as "bad" by the majority of readers';
    }

    return (
      <div className="comment-source">
        <a className={linkClassName} href={href} target="_blank" title={title}>
          {href}
        </a>
        <div className="button-group" style={{ flexBasis: '200px' }}>
          <button
            className="button button--positive"
            type="button"
            title="Mark this source as &quot;good&quot;"
            onClick={this.onUpVote}
          >
            Good ({upVotes})
          </button>
          <button
            className="button button--negative"
            type="button"
            title="Mark this source as &quot;bad&quot;"
            onClick={this.onDownVote}
          >
            Bad ({downVotes})
          </button>
        </div>
      </div>
    );
  }
}
