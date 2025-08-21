import { Outlet } from "react-router-dom";
import { GenericSuspense } from "@chat/component";
import Aurora from "components/background/Aurora";
import './css/client-layout.css';

const ClientLayout = () => {
    return (
        <>
            <div className="client-layout">
                <div className="aurora-container">
                    <Aurora
                        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={0.5}
                    />
                </div>

                <main className="main-wrapper">
                    <GenericSuspense>
                        <Outlet />
                    </GenericSuspense>
                </main>
            </div>
        </>
    );
};

export default ClientLayout;
