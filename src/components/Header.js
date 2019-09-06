import React, {PureComponent} from 'react';
import {withTheme, Searchbar} from 'react-native-paper';
import {View} from 'react-native';
import {connect} from 'react-redux';

import {updateQuery} from '../actions/mediaStore';

class Header extends PureComponent {
  state = {
    query: '',
  };

  handleChange = text => {
    this.setState({query: text});
    this.props.updateQuery(text);
  };

  handleFocus = () => this.setState({isFocused: true});

  handleBlur = () => this.setState({isFocused: false});

  render() {
    const {colors} = this.props.theme;

    return (
      <View style={{backgroundColor: colors.background}}>
        <Searchbar
          onFocus={this.handleFocus}
          placeholder="Artists, songs or podcasts"
          onChangeText={this.handleChange}
          value={this.state.query}
          icon="search"
          style={{margin: 10}}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}

export default connect(
  null,
  {updateQuery},
)(withTheme(Header));
