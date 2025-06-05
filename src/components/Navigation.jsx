
/*eslint linebreak-style: ["error", "windows"]*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
function Navigation({ authUser, signOut }){
  const { id, avatar, name } = authUser;

  return (
    <div className="navigation">
      <img src={avatar} alt={id} title={name}/>
      <nav>
        <Link to="/" aria-label='Home' data-cy='home-link'><FaHome aria-hidden="true" /></Link>
      </nav>
      <button type="button" onClick={signOut}>Sign Out</button>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,

};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;