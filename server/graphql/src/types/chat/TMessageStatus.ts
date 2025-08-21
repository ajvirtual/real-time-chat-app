import { registerEnumType } from "type-graphql";

export enum TMessageStatus {
  PENDING = "pending",
  DELIVERED = "delivered",
  READ = "read",
}

registerEnumType(TMessageStatus, {
  name: "TMessageStatus",
  description: "The status of a message",
});