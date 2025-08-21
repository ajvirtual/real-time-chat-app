
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_list_of_value.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TWizard {
    
                
        TWizard({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.wizardKey,
this.type,
this.title,
this.value,
this.comment,
this.tags });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? wizardKey;

String? type;

String? title;

String? value;

String? comment;

TListOfValue? tags;
                
        static TWizard? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TWizard(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
wizardKey: data['wizardKey'],
type: data['type'],
title: data['title'],
value: data['value'],
comment: data['comment'],
                userCreator: TUser.toInstance(data['userCreator']),
tags: TListOfValue.toInstance(data['tags'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'wizardKey': wizardKey,
'type': type,
'title': title,
'value': value,
'comment': comment,
                'userCreator': userCreator?.toJson(),
'tags': tags?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TWizardsResponse {
    List<TWizard?>? data;

    int? total;

    TWizardsResponse({ this.total, this.data });

    static TWizardsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TWizardsResponse(
            total: data['total'],
            data: data['data']?.map<TWizard>((item) => TWizard.toInstance(item)!).toList()
        );
    }
}
    
        