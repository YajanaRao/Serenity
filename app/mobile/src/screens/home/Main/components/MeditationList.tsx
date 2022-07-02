import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Headline } from '@serenity/components';
import { Meditation } from '../../components/Meditation';
import { SongProps } from '@serenity/core';
import { Meditations } from '@serenity/extensions';
import { useNavigation } from '@react-navigation/core';

const MeditationList = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [meditations, setMeditations] = React.useState([]);

  useEffect(() => {
    setMeditations(Meditations.getMeditations())
  }, [])


  const navigateToMeditation = (item: any) => {
    navigation.navigate("Meditation", { meditation: item })
  };

  if (netInfo.isConnected) {
    return (
      <View>
        {/* <View
          style={styles.titleContainer}
        > */}
          <Headline style={styles.title}>Meditations</Headline>
        {/* </View> */}
        <FlatList
          horizontal
          data={meditations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{paddingTop: 14}}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: SongProps }) => <Meditation track={item} onPress={navigateToMeditation} />}
        />
      </View>
    );
  }

  return null;
};

export default MeditationList;

const styles = StyleSheet.create({
  title: {
    marginLeft: 16,
  }
});
