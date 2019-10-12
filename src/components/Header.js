import React, {PureComponent} from 'react';
import {withTheme, Searchbar} from 'react-native-paper';
import {View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updateQuery} from '../actions/mediaStore';

class Header extends PureComponent {
  state = {
    query: ''
  };

  handleChange = text => {
    this.setState({query: text});
    this.props.updateQuery(text);
  };


  render() {
    const {colors} = this.props.theme;

    return (
      <View style={{backgroundColor: colors.background}}>
        <Searchbar
          placeholder="Artists, songs or podcasts"
          onChangeText={this.handleChange}
          value={this.state.query}
          icon="search"
          style={{margin: 10}}
        />
      </View>
    );
  }
}

Header.propTypes = {
  updateQuery: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

export default connect(
  null,
  {updateQuery},
)(withTheme(Header));
