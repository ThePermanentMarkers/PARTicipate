import React from 'react';
import ArticleSection from './ArticleSection';
import data from './data';

export default class Article extends React.Component {
  toggleHeatMap = e => {
    e.preventDefault();
    console.log('toggle Heat Map');
    this.setState(state => ({
      heatMapOpen: !state.heatMapOpen,
    }));
  };

  state = {
    heatMapOpen: false,
    article: data.article,
    totalCommentCount: data.totalCommentCount,
  };

  componentDidMount() {
    data.addChangeListener(this.onDataChange);
  }

  onDataChange = () => {
    this.setState({
      article: data.article,
      totalCommentCount: data.totalCommentCount,
    });
  };

  render() {
    const { article, totalCommentCount } = this.state;

    return (
      <div className="article">
        <img
          className="article__logo"
          src="marker.png"
          alt="Permanent Markers"
        />
        <h1 className="article__heading">{article.title}</h1>
        <h2 className="article__author">
          {article.author} -{' '}
          <span className="article__date">{article.date}</span>
        </h2>
        <p className="article__intro">{article.summary}</p>
        <button
          onClick={this.toggleHeatMap}
          title="Shows a heatmap indicating the paragraphs with most comments. Red: HOT, Blue: COLD"
          className="button button__heatmap"
        >
          {this.state.heatMapOpen ? 'Hide' : 'Show'} comments heat map
        </button>
        {article.sections.map((section, i) => (
          <ArticleSection
            heatMapOpen={this.state.heatMapOpen}
            totalCommentCount={totalCommentCount}
            sectionCommentCount={section.comments.length}
            sectionId={i}
            key={i}
            {...section}
          />
        ))}
      </div>
    );
  }
}
