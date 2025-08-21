
import { registerEnumType } from "type-graphql";

export enum TMediaType {
  TEXT = "text",
  FILE = "file",
  AUDIO = "audio",
  VIDEO = "video",
  IMAGE = "image",
}

registerEnumType(TMediaType, {
  name: "TMediaType",
  description: "The type of media associated with a message",
});