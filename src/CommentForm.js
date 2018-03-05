import React from 'react';
import data from './data';

export default class CommentForm extends React.Component {
  state = {
    open: false,
    text: '',
    sources: [],
  };

  onTextChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  onTextFocus = e => {
    this.setState({ open: true });
  };

  onSubmit = e => {
    e.preventDefault();
    data.addComment(this.props.sectionId, {
      author: '1337',
      text: this.state.text,
      sources: this.state.sources.map(href => ({
        href,
        upVotes: 0,
        downVotes: 0,
      })),
    });
    this.reset();
  };

  reset = () => {
    this.setState({
      open: false,
      text: '',
      sources: [],
    });
  };

  addSource = e => {
    this.setState(state => ({
      sources: [...state.sources, ''],
    }));
  };

  onSourceChange = e => {
    const value = e.target.value;
    const id = e.target.dataset.id;

    this.setState(state => {
      const sources = [...state.sources];
      sources[id] = value;
      return { sources };
    });
  };

  render() {
    const { open, text, sources, sectionId } = this.state;

    let textClassName = 'comment-form__text';
    if (open) {
      textClassName += ' comment-form__text--open';
    }

    return (
      <form className="comment-form" onSubmit={this.onSubmit}>
        <textarea
          className={textClassName}
          placeholder="Add a comment"
          onChange={this.onTextChange}
          onFocus={this.onTextFocus}
          value={text}
          required
        />
        {sources.map((text, i) => (
          <input
            key={i}
            className="comment-form__source"
            type="url"
            required
            placeholder="Source"
            value={text}
            data-id={i}
            onChange={this.onSourceChange}
          />
        ))}
        {open && (
          <button className="button" type="button" onClick={this.addSource}>
            Add source
          </button>
        )}
        {open && (
          <div className="button-group">
            <button className="button button--primary" type="submit">
              Submit
            </button>
            <button className="button" type="button" onClick={this.reset}>
              Cancel
            </button>
          </div>
        )}
      </form>
    );
  }
}
