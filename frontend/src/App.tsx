import Header from "./components/Header/Header";
import SideNavigation from "./components/SideNavigation/SideNavigation";
import RoutesComponent from "./routes/routes";

function App() {
    return (
        <>
            <SideNavigation />
            <Header beans="bean" />
            <RoutesComponent />
        </>
    );
}

export default App;
