import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import styles, { BUTTON_IDS, COLORS } from '../styles/styles';
import ColorButton from '../components/ColorButton';
import useSimonGame from '../hooks/useSimonGame';

export default function GameScreen() {
    const {
        level,
        highScore,
        started,
        gameOverMsg,
        hint,
        flashingBtn,
        userFlashBtn,
        isPlayingSequence,
        showGameOverFlash,
        startGame,
        handleBtnPress,
    } = useSimonGame();

    const isGameOver = !!gameOverMsg;

    return (
        <SafeAreaView style={styles.container}>
            {/* Red flash overlay on game over */}
            {showGameOverFlash && <View style={styles.gameOverOverlay} />}

            {/* Title */}
            <Text style={styles.title}>Simon Says Game</Text>

            {/* Level / Game Over message */}
            <Text style={styles.levelText}>
                {gameOverMsg
                    ? gameOverMsg
                    : started
                        ? `Level ${level}`
                        : 'Press START to play'}
            </Text>

            {/* 2x2 Color Button Grid */}
            <View style={styles.btnContainer}>
                {BUTTON_IDS.map((btnId) => (
                    <ColorButton
                        key={btnId}
                        btnId={btnId}
                        onPress={handleBtnPress}
                        isFlashing={flashingBtn === btnId}
                        isUserFlash={userFlashBtn === btnId}
                        disabled={!started || isPlayingSequence}
                    />
                ))}
            </View>

            {/* Hint */}
            <Text style={styles.hintText}>{hint}</Text>

            {/* High Score */}
            <Text style={styles.highScoreText}>
                Highest score : {highScore}
            </Text>

            {/* START / Play Again button */}
            <TouchableOpacity
                style={[
                    styles.startBtn,
                    isGameOver && styles.startBtnGameOver,
                ]}
                onPress={startGame}
                activeOpacity={0.7}
                disabled={started && !isGameOver}
            >
                <Text
                    style={[
                        styles.startBtnText,
                        isGameOver && styles.startBtnTextGameOver,
                    ]}
                >
                    {isGameOver ? 'Play Again' : 'START'}
                </Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Made with ♥ by Rudra</Text>
            </View>
        </SafeAreaView>
    );
}
