
            
import 'package:flutter_login/entities/t_session_user.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TSession {
    
                
        TSession({ this.id,
this.createdAt,
this.updatedAt,
this.token,
this.userAgent,
this.browser,
this.browserVersion,
this.mobileName,
this.robotName,
this.referer,
this.plateform,
this.device,
this.userAgentJson,
this.sessionUsers });
    
                int? id;

String? createdAt;

String? updatedAt;

String? token;

String? userAgent;

String? browser;

String? browserVersion;

String? mobileName;

String? robotName;

String? referer;

String? plateform;

String? device;

String? userAgentJson;

List<TSessionUser>? sessionUsers;
                
        static TSession? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TSession(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
token: data['token'],
userAgent: data['userAgent'],
browser: data['browser'],
browserVersion: data['browserVersion'],
mobileName: data['mobileName'],
robotName: data['robotName'],
referer: data['referer'],
plateform: data['plateform'],
device: data['device'],
userAgentJson: data['userAgentJson'],
                sessionUsers: data['sessionUsers']?.map<TSessionUser>((item) => TSessionUser.toInstance(item)!).toList()
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'token': token,
'userAgent': userAgent,
'browser': browser,
'browserVersion': browserVersion,
'mobileName': mobileName,
'robotName': robotName,
'referer': referer,
'plateform': plateform,
'device': device,
'userAgentJson': userAgentJson,
                'sessionUsers': sessionUsers?.map((item) => item.toJson())
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TSessionsResponse {
    List<TSession?>? data;

    int? total;

    TSessionsResponse({ this.total, this.data });

    static TSessionsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TSessionsResponse(
            total: data['total'],
            data: data['data']?.map<TSession>((item) => TSession.toInstance(item)!).toList()
        );
    }
}
    
        