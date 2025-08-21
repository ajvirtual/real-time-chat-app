
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_session_user_date.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TSessionUser {
    
                
        TSessionUser({ this.id,
this.createdAt,
this.updatedAt,
this.session,
this.user,
this.remember,
this.authenticated,
this.active,
this.sessionUserDates });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? session;

TUser? user;

bool? remember;

bool? authenticated;

bool? active;

List<TSessionUserDate>? sessionUserDates;
                
        static TSessionUser? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TSessionUser(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
remember: data['remember'],
authenticated: data['authenticated'],
active: data['active'],
                session: TUser.toInstance(data['session']),
user: TUser.toInstance(data['user']),
sessionUserDates: data['sessionUserDates']?.map<TSessionUserDate>((item) => TSessionUserDate.toInstance(item)!).toList()
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'remember': remember,
'authenticated': authenticated,
'active': active,
                'session': session?.toJson(),
'user': user?.toJson(),
'sessionUserDates': sessionUserDates?.map((item) => item.toJson())
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TSessionUsersResponse {
    List<TSessionUser?>? data;

    int? total;

    TSessionUsersResponse({ this.total, this.data });

    static TSessionUsersResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TSessionUsersResponse(
            total: data['total'],
            data: data['data']?.map<TSessionUser>((item) => TSessionUser.toInstance(item)!).toList()
        );
    }
}
    
        