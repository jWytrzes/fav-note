import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import { theme as theme1 } from 'theme/darkTheme';
import { theme as theme2 } from 'theme/mainTheme';
import PageContext from 'context';
import { connect } from 'react-redux';

class MainTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: 'notes',
    };
  }

  componentDidMount() {
    this.setCurrentPage();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setCurrentPage(prevState);
  }

  setCurrentPage = (prevState = '') => {
    const pageTypes = ['notes', 'twitters', 'articles'];
    const {
      location: { pathname },
    } = this.props;

    const [currentPage] = pageTypes.filter(page => pathname.includes(page));

    if (prevState.pageType !== currentPage) {
      this.setState({ pageType: currentPage });
    }
  };

  render() {
    const { children, darkTheme } = this.props;
    const { pageType } = this.state;

    return (
      <div>
        <PageContext.Provider value={pageType}>
          <ThemeProvider theme={darkTheme ? theme1 : theme2}>
            {' '}
            <GlobalStyle /> {children}{' '}
          </ThemeProvider>
        </PageContext.Provider>
      </div>
    );
  }
}

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  darkTheme: PropTypes.shape({
    notes: PropTypes.string.isRequired,
    twitters: PropTypes.string.isRequired,
    articles: PropTypes.string.isRequired,
    grey100: PropTypes.string.isRequired,
    grey200: PropTypes.string.isRequired,
    grey300: PropTypes.string.isRequired,
    black: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bcg: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
    light: PropTypes.number.isRequired,
    bold: PropTypes.number.isRequired,
    fontSize: PropTypes.object.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ darkTheme }) => ({
  darkTheme,
});

export default withRouter(connect(mapStateToProps)(MainTemplate));
