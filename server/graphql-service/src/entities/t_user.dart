
            
import 'package:flutter_login/entities/t_session_user.dart';
import 'package:flutter_login/entities/t_file.dart';
import 'package:flutter_login/entities/t_user_group_invitation.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TUser {
    
                
        TUser({ this.id,
this.createdAt,
this.updatedAt,
this.userName,
this.userNameTolower,
this.email,
this.emailTolower,
this.isDisabled,
this.firstName,
this.lastName,
this.fullName,
this.job,
this.phone,
this.facebook,
this.linkedIn,
this.skype,
this.whatsapp,
this.website,
this.sessionUsers,
this.userCreator,
this.profilePicture,
this.coverPicture,
this.invitations });
    
                int? id;

String? createdAt;

String? updatedAt;

String? userName;

String? userNameTolower;

String? email;

String? emailTolower;

bool? isDisabled;

String? firstName;

String? lastName;

String? fullName;

String? job;

String? phone;

String? facebook;

String? linkedIn;

String? skype;

String? whatsapp;

String? website;

List<TSessionUser>? sessionUsers;

TUser? userCreator;

TFile? profilePicture;

TFile? coverPicture;

List<TUserGroupInvitation>? invitations;
                
        static TUser? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TUser(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
userName: data['userName'],
userNameTolower: data['userNameTolower'],
email: data['email'],
emailTolower: data['emailTolower'],
isDisabled: data['isDisabled'],
firstName: data['firstName'],
lastName: data['lastName'],
fullName: data['fullName'],
job: data['job'],
phone: data['phone'],
facebook: data['facebook'],
linkedIn: data['linkedIn'],
skype: data['skype'],
whatsapp: data['whatsapp'],
website: data['website'],
userCreator: data['userCreator'],
                sessionUsers: data['sessionUsers']?.map<TSessionUser>((item) => TSessionUser.toInstance(item)!).toList(),
profilePicture: TFile.toInstance(data['profilePicture']),
coverPicture: TFile.toInstance(data['coverPicture']),
invitations: data['invitations']?.map<TUserGroupInvitation>((item) => TUserGroupInvitation.toInstance(item)!).toList()
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'userName': userName,
'userNameTolower': userNameTolower,
'email': email,
'emailTolower': emailTolower,
'isDisabled': isDisabled,
'firstName': firstName,
'lastName': lastName,
'fullName': fullName,
'job': job,
'phone': phone,
'facebook': facebook,
'linkedIn': linkedIn,
'skype': skype,
'whatsapp': whatsapp,
'website': website,
'userCreator': userCreator,
                'sessionUsers': sessionUsers?.map((item) => item.toJson()),
'profilePicture': profilePicture?.toJson(),
'coverPicture': coverPicture?.toJson(),
'invitations': invitations?.map((item) => item.toJson())
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TUsersResponse {
    List<TUser?>? data;

    int? total;

    TUsersResponse({ this.total, this.data });

    static TUsersResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TUsersResponse(
            total: data['total'],
            data: data['data']?.map<TUser>((item) => TUser.toInstance(item)!).toList()
        );
    }
}
    
        