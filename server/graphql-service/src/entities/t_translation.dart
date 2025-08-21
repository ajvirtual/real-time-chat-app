
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_descriptor.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TTranslation {
    
                
        TTranslation({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.translationKey,
this.value,
this.comment,
this.language,
this.appName,
this.quality });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? translationKey;

String? value;

String? comment;

TDescriptor? language;

TDescriptor? appName;

TDescriptor? quality;
                
        static TTranslation? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TTranslation(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
translationKey: data['translationKey'],
value: data['value'],
comment: data['comment'],
                userCreator: TUser.toInstance(data['userCreator']),
language: TDescriptor.toInstance(data['language']),
appName: TDescriptor.toInstance(data['appName']),
quality: TDescriptor.toInstance(data['quality'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'translationKey': translationKey,
'value': value,
'comment': comment,
                'userCreator': userCreator?.toJson(),
'language': language?.toJson(),
'appName': appName?.toJson(),
'quality': quality?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TTranslationsResponse {
    List<TTranslation?>? data;

    int? total;

    TTranslationsResponse({ this.total, this.data });

    static TTranslationsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TTranslationsResponse(
            total: data['total'],
            data: data['data']?.map<TTranslation>((item) => TTranslation.toInstance(item)!).toList()
        );
    }
}
    
        