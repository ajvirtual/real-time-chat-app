import Aurora from "components/background/Aurora";
import './css/client-layout.css';
import ChatSupportContainer from "components/chat-support/container/ChatSupportContainer";

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
                    <ChatSupportContainer />
                </main>
            </div>
        </>
    );
};

export default ClientLayout;
