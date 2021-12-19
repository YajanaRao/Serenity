import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import Voice, {
    SpeechResultsEvent,
} from '@react-native-voice/voice';
import LottieView from 'lottie-react-native'
import { Dialog, Portal, IconButton, TouchableRipple } from 'react-native-paper';
import { Title } from '@serenity/components';
import { useNavigation } from '@react-navigation/core';
import Animations from '../../../assets/Animations';
import { log } from 'utils/logging';


const VoiceSearch = () => {
    const [visible, setVisible] = React.useState(false);
    const navigation = useNavigation();
    const animatedRef = useRef<LottieView>(null);

    const showDialog = () => {
        setVisible(true);
        _startRecognizing();
    }

    const hideDialog = () => setVisible(false);

    function onSpeechStart(e: any) {
        animatedRef.current?.play();
    };



    function onSpeechEnd(e: any) {
        animatedRef.current?.pause();
    };


    function onSpeechResults(e: SpeechResultsEvent) {
        animatedRef.current?.pause();
        hideDialog();
        navigation.navigate('Find', { query: e.value[0] })
    };





    async function _startRecognizing() {
        // this.animatedRef.start();
        try {
            await Voice.start('en-US');
        } catch (e) {
            log.error('_startRecognizing', e);
        }
    };

    async function _stopRecognizing() {
        try {
            await Voice.stop();
        } catch (e) {
            log.error('_stopRecognizing',e);
        }
    };



    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;
        return () => Voice.destroy().then(Voice.removeAllListeners);
    }, [])

    return (
        <View>
            <IconButton icon="mic-outline" style={{ alignSelf: 'flex-end' }} onPress={showDialog} />
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
                            <TouchableRipple style={{ height: 150, width: 150 }}>
                                <LottieView
                                    ref={animatedRef}
                                    source={Animations.voiceAnimation}
                                    loop
                                />
                            </TouchableRipple>
                            <Title>Speak now</Title>
                        </View>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    );
};

export default VoiceSearch;