import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

class HorizontalScrollViewContainer extends React.PureComponent {
    render() {
        const { children}  = this.props;
        return (
            <ScrollView horizontal={true} contentContainerStyle={styles.content} showsHorizontalScrollIndicator={false}>
               {children}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  }
});

export default HorizontalScrollViewContainer;