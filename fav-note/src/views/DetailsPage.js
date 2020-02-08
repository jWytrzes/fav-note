import React, { useEffect, useState } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

const DetailsPage = ({ activeItem, match }) => {
  const [item, setItem] = useState({
    title: '',
    content: '',
    twitterName: '',
    articleUrl: '',
  });

  useEffect(() => {
    if (activeItem) {
      const [newItem] = activeItem;
      setItem(newItem);
    } else {
      const { id } = match.params;
      axios
        .get(`http://localhost:9000/api/note/${id}`)
        .then(({ data }) => {
          setItem(data);
        })
        .catch(err => console.log(err));
    }
  }, [activeItem]);

  return (
    <DetailsTemplate
      title={item.title}
      created={item.created}
      content={item.content}
      articleUrl={item.articleUrl}
      twitterName={item.twitterName}
    />
  );
};

DetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  activeItem: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    articleUrl: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  if (state[ownProps.pageContext]) {
    return {
      activeItem: state[ownProps.pageContext].filter(item => item._id === ownProps.match.params.id),
    };
  }
  return {};
};
export default withContext(connect(mapStateToProps)(DetailsPage));
