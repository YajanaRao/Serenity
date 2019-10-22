import React, { PureComponent } from 'react';
import { withTheme, Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateQuery } from '../actions/mediaStore';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleChange = text => {
    const { updateQuery } = this.props;
    this.setState({ query: text });
    updateQuery(text);
  };

  render() {
    const {
      theme: { colors },
    } = this.props;

    const { query } = this.state;

    return (
      <View style={{ backgroundColor: colors.background }}>
        <Searchbar
          placeholder="Artists, songs or podcasts"
          onChangeText={this.handleChange}
          value={query}
          icon="magnify"
          style={{ margin: 10 }}
        />
      </View>
    );
  }
}

Header.propTypes = {
  updateQuery: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(
  null,
  { updateQuery },
)(withTheme(Header));
