import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import bulbIcon from 'assets/icons/bulb.svg';
import logoutIcon from 'assets/icons/logout.svg';
import penIcon from 'assets/icons/pen.svg';
import twitterIcon from 'assets/icons/twitter.svg';
import logoIcon from 'assets/icons/logo.svg';
import contrastIcon from 'assets/icons/contrastIcon.png';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import { logOut as logOutAction, toggleTheme as toggleThemeAction } from 'actions';

const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 150px;
  height: 100vh;
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : theme.notes)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 67px;
  height: 67px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 10vh;
`;

const StyledBottomWrapper = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Sidebar = ({ pageContext, logOut, toggleTheme, darkTheme }) => {
  const [redirect, setRedirect] = useState(false);
  const handleLogOut = async () => {
    await logOut();
    setRedirect(!redirect);
  };

  const handleThemeChange = () => {
    toggleTheme();
    localStorage.setItem('DARK_THEME', !darkTheme);
  };

  return (
    <StyledWrapper activeColor={pageContext}>
      <StyledLogoLink to="/" />
      <StyledLinksList>
        <li>
          <ButtonIcon as={NavLink} to="/notes" icon={penIcon} activeclass="active" />
        </li>
        <li>
          <ButtonIcon as={NavLink} to="/twitters" icon={twitterIcon} activeclass="active" />
        </li>
        <li>
          <ButtonIcon as={NavLink} to="/articles" icon={bulbIcon} activeclass="active" />
        </li>
      </StyledLinksList>
      <StyledBottomWrapper>
        <ButtonIcon onClick={handleThemeChange} icon={contrastIcon} />
        <ButtonIcon onClick={handleLogOut} icon={logoutIcon} />
      </StyledBottomWrapper>
      {redirect && <Redirect to="/login" />}
    </StyledWrapper>
  );
};

Sidebar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  logOut: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired,
};

Sidebar.defaultProps = {
  pageContext: 'notes',
};

const mapStateToProps = ({ darkTheme }) => ({
  darkTheme,
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutAction()),
  toggleTheme: () => dispatch(toggleThemeAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withContext(Sidebar));
