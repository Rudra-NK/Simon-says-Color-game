import { useState, useRef, useCallback } from 'react';
import { BUTTON_IDS } from '../styles/styles';

const FLASH_DURATION = 250;
const SEQUENCE_INTERVAL = 600;
const LEVEL_UP_DELAY = 1000;
const START_DELAY = 700;

export default function useSimonGame() {
    const [level, setLevel] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [started, setStarted] = useState(false);
    const [gameOverMsg, setGameOverMsg] = useState('');
    const [hint, setHint] = useState('Hint : Try to match the color sequence');
    const [flashingBtn, setFlashingBtn] = useState(null);
    const [userFlashBtn, setUserFlashBtn] = useState(null);
    const [isPlayingSequence, setIsPlayingSequence] = useState(false);
    const [showGameOverFlash, setShowGameOverFlash] = useState(false);

    const gameSeqRef = useRef([]);
    const userSeqRef = useRef([]);
    const levelRef = useRef(0);
    const startedRef = useRef(false);
    const isPlayingRef = useRef(false);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const flashButton = useCallback(async (btnId, isUser = false) => {
        if (isUser) {
            setUserFlashBtn(btnId);
            await sleep(FLASH_DURATION);
            setUserFlashBtn(null);
        } else {
            setFlashingBtn(btnId);
            await sleep(FLASH_DURATION);
            setFlashingBtn(null);
        }
    }, []);

    const playSequence = useCallback(async (sequence) => {
        setIsPlayingSequence(true);
        isPlayingRef.current = true;

        for (let i = 0; i < sequence.length; i++) {
            await sleep(150);
            await flashButton(sequence[i]);
            await sleep(SEQUENCE_INTERVAL - FLASH_DURATION - 150);
        }

        setIsPlayingSequence(false);
        isPlayingRef.current = false;
    }, [flashButton]);

    const levelUp = useCallback(async () => {
        userSeqRef.current = [];

        const newLevel = levelRef.current + 1;
        levelRef.current = newLevel;
        setLevel(newLevel);
        setGameOverMsg('');

        // Update high score
        setHighScore((prev) => {
            if (newLevel > prev) return newLevel;
            return prev;
        });

        // Pick a random new color
        const randIdx = Math.floor(Math.random() * BUTTON_IDS.length);
        const randColor = BUTTON_IDS[randIdx];
        const newSequence = [...gameSeqRef.current, randColor];
        gameSeqRef.current = newSequence;

        // Play the full sequence
        await playSequence(newSequence);
    }, [playSequence]);

    const reset = useCallback(() => {
        startedRef.current = false;
        setStarted(false);
        gameSeqRef.current = [];
        userSeqRef.current = [];
        levelRef.current = 0;
        setLevel(0);
    }, []);

    const checkAnswer = useCallback(
        async (idx) => {
            if (userSeqRef.current[idx] === gameSeqRef.current[idx]) {
                if (userSeqRef.current.length === gameSeqRef.current.length) {
                    // Correct full sequence — level up after delay
                    await sleep(LEVEL_UP_DELAY);
                    await levelUp();
                }
            } else {
                // Wrong answer — game over
                const score = levelRef.current;
                setGameOverMsg(`Game over! Your score was ${score}`);
                setHint('Hint : Remember the color sequence');

                // Red flash effect
                setShowGameOverFlash(true);
                await sleep(150);
                setShowGameOverFlash(false);

                reset();
            }
        },
        [levelUp, reset]
    );

    const handleBtnPress = useCallback(
        async (btnId) => {
            if (!startedRef.current || isPlayingRef.current) return;

            await flashButton(btnId, true);

            userSeqRef.current = [...userSeqRef.current, btnId];
            const currentIdx = userSeqRef.current.length - 1;

            await checkAnswer(currentIdx);
        },
        [flashButton, checkAnswer]
    );

    const startGame = useCallback(async () => {
        if (startedRef.current) return;
        startedRef.current = true;
        setStarted(true);
        setGameOverMsg('');
        setHint('Hint : Try to match the color sequence');

        await sleep(START_DELAY);
        await levelUp();
    }, [levelUp]);

    return {
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
    };
}
