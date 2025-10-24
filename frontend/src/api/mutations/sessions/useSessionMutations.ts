import { useMutation } from "@tanstack/react-query";
import { endSession, startSession } from "../../handlers/sessions";
import useToastStore from "../../../stores/toastStore";
import type { iSessionCreation } from "../../../schemas/sessionSchemas";
import type { iGameStat } from "../../../interfaces/gameStat";

export const useStartSession = () => {
    const setToastInfo = useToastStore((s) => s.setToastInfo);
    return useMutation<iGameStat, Error, iSessionCreation>({
        mutationFn: (body: iSessionCreation) => startSession(body),
        mutationKey: ["session"],
        onError: (error) => {
            setToastInfo({ message: (error as Error)?.message ?? "An error occurred", type: "error", duration: 7 });
        },
        onSuccess: (data) => {
            setToastInfo({
                message: `${data?.user} your game ${data?.game} has started!`,
                type: "success",
            });
        },
    });
};
export const useEndSession = () => {
    const setToastInfo = useToastStore((s) => s.setToastInfo);
    return useMutation<iGameStat, Error, number>({
        mutationFn: (id: number) => endSession(id),
        mutationKey: ["session"],
        onError: (error) => {
            setToastInfo({ message: (error as Error)?.message ?? "An error occurred", type: "error", duration: 7 });
        },
        onSuccess: (data) => {
            setToastInfo({ message: `${data?.user} your game ${data?.game} has stopped!`, type: "success" });
        },
    });
};
