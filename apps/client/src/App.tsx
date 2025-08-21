import { AppRoot, MainLogo } from "@chat/component";
import { Routes } from "./page/Routes";

const App = () => {

    return (
        <AppRoot
            routes={Routes}
            protectedRoutes="*"
            suspenseFallback={<MainLogo />}
        />
    );
};
export default App;
