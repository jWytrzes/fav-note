import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { fetchItems } from '../actions';

const Articles = ({ articles, fetchArticles }) => {
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <GridTemplate notesCount={articles.length}>
      {articles.map(({ _id: id, title, content, articleUrl }) => (
        <Card id={id} title={title} content={content} articleUrl={articleUrl} key={id} />
      ))}
    </GridTemplate>
  );
};

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // cardType: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      articleUrl: PropTypes.string.isRequired,
    }),
  ),
  fetchArticles: PropTypes.func.isRequired,
};

Articles.defaultProps = {
  articles: [],
};

const mapStateToProps = ({ articles }) => {
  return { articles };
};

const mapDispatchToProps = dispatch => ({
  fetchArticles: () => dispatch(fetchItems('articles')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
