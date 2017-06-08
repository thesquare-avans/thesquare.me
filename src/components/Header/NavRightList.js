import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { hashHistory } from 'react-router';

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '50px' // 36 + 16, algin with sub list
};
const styles = {
  title: {
    cursor: 'pointer',
  },
};

class NavRightList extends React.Component {

  handleChange = (event, value) => {
    hashHistory.push(value);
  }


  render() {
    return (
      <ul className="list-unstyled float-right">
          <li style={{marginRight: '10px'}}>

            title={<span style={styles.title}>Title</span>}
            
        </li>
      </ul>
    );
  }
}

module.exports = NavRightList;
