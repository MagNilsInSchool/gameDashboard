import { useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import SideNavigation from "./components/SideNavigation/SideNavigation";
import RoutesComponent from "./routes/routes";
import useUserStore from "./stores/userStore";
import { addItemsToStorage, getActiveUserFromStorage } from "./utils/sessionStorage";
import Toast from "./components/Toast/Toast";
import useToastStore from "./stores/toastStore";

function App() {
    const { setActiveUser, activeUser } = useUserStore();
    const { setToastInfo, toastInfo } = useToastStore();
    const hasLoaded = useRef(false);
    const toastTimerRef = useRef<number | null>(null);

    useEffect(() => {
        if (hasLoaded.current) {
            addItemsToStorage("activeUser", activeUser);
        }
    }, [activeUser]);

    useEffect(() => {
        const storedUser = getActiveUserFromStorage();
        if (storedUser && !hasLoaded.current) {
            setActiveUser(storedUser);
        }
        hasLoaded.current = true;
    }, [setActiveUser]);

    useEffect(() => {
        if (toastInfo) {
            toastTimerRef.current = setTimeout(() => {
                setToastInfo(null);
            }, (toastInfo.duration ?? 5) * 1000);
        }
        return () => {
            if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        };
    }, [setToastInfo, toastInfo]);

    return (
        <>
            <SideNavigation />
            <Header />
            <main className="shared-page-style">
                <RoutesComponent />
                {toastInfo && <Toast message={toastInfo.message} type={toastInfo.type} duration={toastInfo.duration} />}
            </main>
        </>
    );
}

export default App;
