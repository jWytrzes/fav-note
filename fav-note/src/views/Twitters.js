import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { fetchItems } from '../actions';

const Twitters = ({ twitters, fetchTwitters }) => {
  useEffect(() => {
    fetchTwitters();
  }, [fetchTwitters]);

  return (
    <GridTemplate notesCount={twitters.length}>
      {twitters.map(({ title, content, twitterName, _id: id }) => (
        <Card id={id} title={title} content={content} twitterName={twitterName} key={id} />
      ))}
    </GridTemplate>
  );
};

Twitters.propTypes = {
  twitters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      twitterName: PropTypes.string.isRequired,
    }),
  ),
  fetchTwitters: PropTypes.func.isRequired,
};

Twitters.defaultProps = {
  twitters: [],
};

const mapStateToProps = ({ twitters }) => {
  return { twitters };
};

const mapDispatchToProps = dispatch => ({
  fetchTwitters: () => dispatch(fetchItems('twitters')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Twitters);
