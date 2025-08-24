import Aurora from "components/background/Aurora";
import './css/client-layout.css';
import ChatSupportContainer from "components/chat-support/container/ChatSupportContainer";
import { UserPickerOverlay } from "components/chat-support/components/UserPickerOverlay";
import { useUserId } from "components/chat-support/hooks/utils/useUserId";

const ClientLayout = () => {

    const { ids, setIds } = useUserId();

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

                <UserPickerOverlay
                    open={!ids}
                    onPick={(id, peerId, peerName) => setIds(id, peerId, peerName)}
                />
                <main className="main-wrapper">
                    <ChatSupportContainer
                        userId={ids?.userId}
                        peerId={ids?.peerId}
                        peerName={ids?.peerName}
                    />
                </main>
            </div>
        </>
    );
};

export default ClientLayout;
