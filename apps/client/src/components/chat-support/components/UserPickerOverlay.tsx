import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type TProps = {
    open: boolean;
    onPick: (userId: number, peerId: number) => void;
};

export const UserPickerOverlay = ({ open, onPick }: TProps) => {

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div style={styles.backdrop} aria-modal="true" role="dialog">
            <div style={styles.card}>
                <h1 style={styles.title}>Choose a user</h1>
                <p style={styles.subtitle}>Pick the identity for this session.</p>
                <div style={styles.grid}>
                    <button style={styles.btn} onClick={() => onPick(1, 2)} aria-label="Sign in as User 1">
                        <span style={styles.avatar}>1</span>
                        <span>User 1</span>
                    </button>
                    <button style={styles.btn} onClick={() => onPick(2, 1)} aria-label="Sign in as User 2">
                        <span style={styles.avatar}>2</span>
                        <span>User 2</span>
                    </button>
                </div>
                <p style={styles.hint}>You can change later from the menu.</p>
            </div>
        </div>,
        document.body
    );
};

const styles: Record<string, React.CSSProperties> = {
    backdrop: {
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
    },
    card: {
        width: "min(520px, 92vw)",
        background: "#0e1116",
        color: "white",
        borderRadius: 16,
        padding: "28px 24px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        border: "1px solid rgba(255,255,255,0.08)",
    },
    title: { margin: 0, fontSize: 22, fontWeight: 700 },
    subtitle: { marginTop: 8, opacity: 0.75 },
    grid: {
        marginTop: 18,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
    },
    btn: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        padding: "14px 16px",
        borderRadius: 12,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "white",
        cursor: "pointer",
        fontSize: 16,
        justifyContent: "center",
    },
    avatar: {
        display: "inline-grid",
        placeItems: "center",
        width: 36, height: 36,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.12)",
        fontWeight: 700,
    },
    hint: { marginTop: 14, fontSize: 12, opacity: 0.6, textAlign: "center" },
};
