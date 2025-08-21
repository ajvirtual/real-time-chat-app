
            
import 'package:flutter_login/entities/t_descriptor.dart';
import 'package:flutter_login/entities/t_user_organisation.dart';
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_user_group_invitation.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TUserGroup {
    
                
        TUserGroup({ this.id,
this.createdAt,
this.updatedAt,
this.groupKey,
this.designation,
this.comment,
this.color,
this.roles,
this.organisation,
this.userCreator,
this.invitations });
    
                int? id;

String? createdAt;

String? updatedAt;

String? groupKey;

String? designation;

String? comment;

String? color;

TDescriptor? roles;

TUserOrganisation? organisation;

TUser? userCreator;

List<TUserGroupInvitation>? invitations;
                
        static TUserGroup? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TUserGroup(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
groupKey: data['groupKey'],
designation: data['designation'],
comment: data['comment'],
color: data['color'],
                roles: TDescriptor.toInstance(data['roles']),
organisation: TUserOrganisation.toInstance(data['organisation']),
userCreator: TUser.toInstance(data['userCreator']),
invitations: data['invitations']?.map<TUserGroupInvitation>((item) => TUserGroupInvitation.toInstance(item)!).toList()
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'groupKey': groupKey,
'designation': designation,
'comment': comment,
'color': color,
                'roles': roles?.toJson(),
'organisation': organisation?.toJson(),
'userCreator': userCreator?.toJson(),
'invitations': invitations?.map((item) => item.toJson())
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TUserGroupsResponse {
    List<TUserGroup?>? data;

    int? total;

    TUserGroupsResponse({ this.total, this.data });

    static TUserGroupsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TUserGroupsResponse(
            total: data['total'],
            data: data['data']?.map<TUserGroup>((item) => TUserGroup.toInstance(item)!).toList()
        );
    }
}
    
        