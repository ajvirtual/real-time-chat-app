import { TBase } from "./TBase";
import { TEntityUserCreator } from "./TEntityUserCreator";
import { TFile } from "./TFile";
import { TSoftDeleteEntity } from "./TSoftDeleteEntity";
import { TTimeStamp } from "./TTimeStamp";
import { TUser } from "./TUser";

export const BaseEntities = [
    TBase, TTimeStamp, TSoftDeleteEntity, 
    TEntityUserCreator, TUser, TFile
]
