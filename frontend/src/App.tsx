import { useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import SideNavigation from "./components/SideNavigation/SideNavigation";
import RoutesComponent from "./routes/routes";
import useUserStore from "./stores/userStore";
import { addItemsToStorage, getActiveUserFromStorage } from "./utils/sessionStorage";

function App() {
    const { setActiveUser, activeUser } = useUserStore();
    const hasLoaded = useRef(false);

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

    return (
        <>
            <SideNavigation />
            <Header />
            <RoutesComponent />
        </>
    );
}

export default App;
