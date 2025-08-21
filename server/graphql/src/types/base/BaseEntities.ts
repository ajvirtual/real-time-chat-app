import { TBase } from "./TBase";
import { TBookmark } from "./TBookmark";
import { TDescriptor } from "./TDescriptor"; 
import { TEntityUserCreator } from "./TEntityUserCreator";
import { TFile } from "./TFile";
import { TDocumentTemplate } from "./TDocumentTemplate";
import { TListOfValue } from "./TListOfValue";
import { TLog } from "./TLog";
import { TSession } from "./TSession";
import { TSessionUser } from "./TSessionUser";
import { TSessionUserDate } from "./TSessionUserDate";
import { TSoftDeleteEntity } from "./TSoftDeleteEntity";
import { TTimeStamp } from "./TTimeStamp";
import { TUser } from "./TUser";
import { TUserGroup } from "./TUserGroup";
import { TUserOrganisation } from "./TUserOrganisation";
import { TUserGroupInvitation } from "./TUserGroupInvitation";
import { TAutomation } from "./TAutomation";
import { TNotification } from "./TNotification";
import { TTransaction } from "./TTransaction";

export const BaseEntities = [
    TBase, TTimeStamp, TSoftDeleteEntity, 
    TLog, TDescriptor, TListOfValue, 
    TEntityUserCreator,
    TUserGroup, TUserOrganisation, TUser, TUserGroupInvitation,
    TSession, TSessionUser, TSessionUserDate,
    TFile, TBookmark, TDocumentTemplate,
    TAutomation, TNotification, TTransaction,
]
