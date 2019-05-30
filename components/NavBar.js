import * as React from 'react';
import {  StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Searchbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import { updateQuery } from '../actions';

class NavBar extends React.PureComponent {


  render() {
    const { query } = this.props.query;

    return (
      <Searchbar
          placeholder="Search"
          onChangeText={(text) => { this.props.updateQuery(text) }}
          value={query}
          onIconPress={() => this.props.navigation.toggleDrawer()}
          icon="menu"
          style={styles.searchbar}
        />
    );
  }
}

const mapStateToProps = state => ({
  query: state.query
});

export default connect(mapStateToProps, { updateQuery })(withNavigation(NavBar));


const styles = StyleSheet.create({
  searchbar: {
    margin: 4,
    // marginTop: Constants.statusBarHeight,
  },
});