
            
import 'package:flutter_login/entities/t_user_group.dart';
import 'package:flutter_login/entities/t_descriptor.dart';
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_file.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TUserOrganisation {
    
                
        TUserOrganisation({ this.id,
this.createdAt,
this.updatedAt,
this.organisationKey,
this.designation,
this.email,
this.phone,
this.comment,
this.groups,
this.roles,
this.userCreator,
this.logo,
this.cover });
    
                int? id;

String? createdAt;

String? updatedAt;

String? organisationKey;

String? designation;

String? email;

String? phone;

String? comment;

List<TUserGroup>? groups;

TDescriptor? roles;

TUser? userCreator;

TFile? logo;

TFile? cover;
                
        static TUserOrganisation? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TUserOrganisation(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
organisationKey: data['organisationKey'],
designation: data['designation'],
email: data['email'],
phone: data['phone'],
comment: data['comment'],
                groups: data['groups']?.map<TUserGroup>((item) => TUserGroup.toInstance(item)!).toList(),
roles: TDescriptor.toInstance(data['roles']),
userCreator: TUser.toInstance(data['userCreator']),
logo: TFile.toInstance(data['logo']),
cover: TFile.toInstance(data['cover'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'organisationKey': organisationKey,
'designation': designation,
'email': email,
'phone': phone,
'comment': comment,
                'groups': groups?.map((item) => item.toJson()),
'roles': roles?.toJson(),
'userCreator': userCreator?.toJson(),
'logo': logo?.toJson(),
'cover': cover?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TUserOrganisationsResponse {
    List<TUserOrganisation?>? data;

    int? total;

    TUserOrganisationsResponse({ this.total, this.data });

    static TUserOrganisationsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TUserOrganisationsResponse(
            total: data['total'],
            data: data['data']?.map<TUserOrganisation>((item) => TUserOrganisation.toInstance(item)!).toList()
        );
    }
}
    
        