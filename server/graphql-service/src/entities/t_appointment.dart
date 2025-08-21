
            
import 'package:flutter_login/entities/t_user.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TAppointment {
    
                
        TAppointment({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.reason,
this.dateBegin,
this.dateEnd,
this.hourBegin,
this.hourEnd,
this.isRevocked,
this.isValidated,
this.type });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? reason;

String? dateBegin;

String? dateEnd;

String? hourBegin;

String? hourEnd;

bool? isRevocked;

bool? isValidated;

String? type;
                
        static TAppointment? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TAppointment(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
reason: data['reason'],
dateBegin: data['dateBegin'],
dateEnd: data['dateEnd'],
hourBegin: data['hourBegin'],
hourEnd: data['hourEnd'],
isRevocked: data['isRevocked'],
isValidated: data['isValidated'],
type: data['type'],
                userCreator: TUser.toInstance(data['userCreator'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'reason': reason,
'dateBegin': dateBegin,
'dateEnd': dateEnd,
'hourBegin': hourBegin,
'hourEnd': hourEnd,
'isRevocked': isRevocked,
'isValidated': isValidated,
'type': type,
                'userCreator': userCreator?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TAppointmentsResponse {
    List<TAppointment?>? data;

    int? total;

    TAppointmentsResponse({ this.total, this.data });

    static TAppointmentsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TAppointmentsResponse(
            total: data['total'],
            data: data['data']?.map<TAppointment>((item) => TAppointment.toInstance(item)!).toList()
        );
    }
}
    
        