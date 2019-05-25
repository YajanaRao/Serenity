import * as React from 'react';
import { Text, View, StyleSheet,ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
// or any pure javascript modules available in npm
import { Searchbar, Card } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { updateQuery, getQuery } from '../actions';

class NavBar extends React.Component {


  render() {
    const { query } = this.props.query;
    console.log("navbar query",query)
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