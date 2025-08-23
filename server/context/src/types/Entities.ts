import { BaseEntities } from "./base/BaseEntities"
import { ChatEntities } from "./chat/ChatEntities"

export const Entities = [
    ...BaseEntities,
    ...ChatEntities,
]

export const initEntities = () => {
    Entities.forEach((item) => {
        return new item()
    })
}
