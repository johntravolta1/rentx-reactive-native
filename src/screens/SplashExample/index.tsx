import React from 'react';
import { Button, StyleSheet } from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, Easing} from 'react-native-reanimated';
import { Container } from './styles';

export function Splash() {
    const animation = useSharedValue(0)
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{translateY: withTiming(animation.value, {
                duration: 500,
                easing: Easing.bezier(.01,1.07,1,0.28)
            })}]
        }
    })
    function handleAnimationPosition() {
        animation.value += 200;
    }
  return (
    <Container style={{flexDirection: 'column', justifyContent: 'space-around'}}>
        <Animated.View style={[styles.box,animatedStyles]}></Animated.View>
        <Button title='Mover' onPress={handleAnimationPosition}></Button>
        <Button title='Reset' onPress={() => {animation.value = 0}}></Button>
    </Container>
  );
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    },
    one: {
        marginTop: 10,
    }
})