import { useNavigate, useParams } from "react-router-dom";
import "./playingPage.css";
import GameCard from "../../components/GameCard/GameCard";
import GameTimer from "../../components/GameTimer/GameTimer";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useGetGame } from "../../api/queries/games/useGames";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";

import type { iSessionCreation } from "../../schemas/sessionSchemas";
import { useEndSession, useStartSession } from "../../api/mutations/sessions/useSessionMutations";
import { useGetUser } from "../../api/queries/users/useUsers";
import useToastStore from "../../stores/toastStore";

const PlayingPage = () => {
    const navigate = useNavigate();
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const gameTimerRef = useRef<number | null>(null);
    const sessionIdRef = useRef<number | null>(null);
    const { gId, uId } = useParams<{ gId: string; uId: string }>();
    const gameId = Number(gId);
    const userId = Number(uId);
    const setToastInfo = useToastStore((s) => s.setToastInfo);
    const sessionCreation: iSessionCreation = { gameId, userId };
    const { data: currentGame, isLoading: gameLoading, error: gameError } = useGetGame(gameId);
    const { data: currentUser, isLoading: userLoading, error: userError } = useGetUser(userId);

    const { mutateAsync: startSession, isPending: isGameStartRequested } = useStartSession();
    const { mutateAsync: endSession, isPending: isGameEndRequested } = useEndSession();

    useEffect(() => {
        if (gameError || userError) {
            const error = gameError ?? userError;
            setToastInfo({
                message: error?.message || "Something went wrong at game launcher.",
                type: "error",
                duration: 5,
            });
            navigate("/");
        }
    }, [gameError, userError, setToastInfo, navigate]);

    useEffect(() => {
        if (isGameRunning) {
            if (gameTimerRef.current !== null) {
                clearInterval(gameTimerRef.current);
            }
            gameTimerRef.current = window.setInterval(() => setSeconds((prev) => prev + 1), 1000);
        } else {
            if (gameTimerRef.current !== null) {
                clearInterval(gameTimerRef.current);
                gameTimerRef.current = null;
                setSeconds(0);
            }
        }

        return () => {
            if (gameTimerRef.current !== null) {
                clearInterval(gameTimerRef.current);
                gameTimerRef.current = null;
                setSeconds(0);
            }
        };
    }, [isGameRunning]);

    const handleStartTimer = async () => {
        try {
            const session = await startSession(sessionCreation);
            sessionIdRef.current = session.id;
            setIsGameRunning(true);
        } catch (error) {
            console.error(error);
        }
    };
    const handleStopTimer = async () => {
        try {
            if (!sessionIdRef.current) return;
            await endSession(sessionIdRef.current);
            setIsGameRunning(false);
            sessionIdRef.current = null;
        } catch (error) {
            console.error(error);
        }
    };

    if (gameLoading || userLoading) return <Loader />;

    return (
        <div className="playing-page wrapper--max-width">
            <div className="playing-page__game-display">
                {currentGame && <GameCard game={currentGame} userId={userId} />}
                <GameTimer
                    timeInSeconds={seconds}
                    timerFunction={!isGameRunning ? handleStartTimer : handleStopTimer}
                    buttonText={
                        isGameStartRequested || isGameEndRequested ? "LOADING" : !isGameRunning ? "START" : "STOP"
                    }
                />
            </div>

            {currentUser && <ProfileCard user={currentUser} />}
        </div>
    );
};

export default PlayingPage;
