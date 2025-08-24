1:1 Chat with Redis + Socket.IO (TypeScript) – Starter Kit

One-to-one chat using TypeScript, Node/Express, Socket.IO, TypeORM (MySql) and Redis for pub/sub, caching recent messages, and presence.

Features

🔒 Direct messages only (no groups)

⚡ Live delivery via Socket.IO (multi-instance ready with Redis adapter)

🧠 Redis for presence, typing state, and recent-message cache

💾 TypeORM persistence (MysQl; easy to switch)

🧑‍💻 Clean room model: dm:<minUserId>:<maxUserId> to avoid duplicates

🔁 Idempotent send with client tempId → server ACK with real DB id

## 🧠 Caching Strategy Notes
- **Recent history cache (Redis List)**: keep last N messages per conversation for instant load.
- **Offline queues (Redis List)**: one queue per conversation **and** role; drain to client on connect.
- **Client-side localStorage**: mirror recent messages for instant paint while socket connects.
- **DB fallback**: paginate older history from MySQL via REST (you can add `/api/chat/history`).

---

## 🔐 About Identity (No Login)
- Use a server-generated `conversationId` shared with both parties (e.g., link from order page or provider dashboard).
- Optionally set a signed cookie with a random `peerId` to avoid impersonation within a conversation.

---

## 🧭 Next Enhancements (optional)
- Redis pub/sub adapter for Socket.IO (multi-instance scaling)
- Typing indicators, read receipts, presence
- Rate limiting (per-IP or per-conversation)
- Virus scan or MIME whitelisting for uploads


## 🛠 Installation

Follow these steps to set up the project:

1. **Clone the repository**:
   ```bash


## 🛠️ Running the Project

### 1. Install dependencies (from project root)
pnpm install
pnpm run build

### 2. Start the backend (Gateway Service)
cd server/gateway-service
pnpm run start:development

### 3. Start the frontend (Client App)
cd app/client
pnpm run start:development

    
    
- 
