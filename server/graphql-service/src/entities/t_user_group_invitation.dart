
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_user_group.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TUserGroupInvitation {
    
                
        TUserGroupInvitation({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.group,
this.user,
this.token,
this.email,
this.status,
this.dateExpired });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

TUserGroup? group;

TUser? user;

String? token;

String? email;

String? status;

String? dateExpired;
                
        static TUserGroupInvitation? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TUserGroupInvitation(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
token: data['token'],
email: data['email'],
status: data['status'],
dateExpired: data['dateExpired'],
                userCreator: TUser.toInstance(data['userCreator']),
group: TUserGroup.toInstance(data['group']),
user: TUser.toInstance(data['user'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'token': token,
'email': email,
'status': status,
'dateExpired': dateExpired,
                'userCreator': userCreator?.toJson(),
'group': group?.toJson(),
'user': user?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TUserGroupInvitationsResponse {
    List<TUserGroupInvitation?>? data;

    int? total;

    TUserGroupInvitationsResponse({ this.total, this.data });

    static TUserGroupInvitationsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TUserGroupInvitationsResponse(
            total: data['total'],
            data: data['data']?.map<TUserGroupInvitation>((item) => TUserGroupInvitation.toInstance(item)!).toList()
        );
    }
}
    
        