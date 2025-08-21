
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_list_of_value.dart';
import 'package:flutter_login/entities/t_wizard_node.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TFlow {
    
                
        TFlow({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.wizardKey,
this.title,
this.value,
this.comment,
this.tags,
this.wizardNodes });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? wizardKey;

String? title;

String? value;

String? comment;

TListOfValue? tags;

List<TWizardNode>? wizardNodes;
                
        static TFlow? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TFlow(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
wizardKey: data['wizardKey'],
title: data['title'],
value: data['value'],
comment: data['comment'],
                userCreator: TUser.toInstance(data['userCreator']),
tags: TListOfValue.toInstance(data['tags']),
wizardNodes: data['wizardNodes']?.map<TWizardNode>((item) => TWizardNode.toInstance(item)!).toList()
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'wizardKey': wizardKey,
'title': title,
'value': value,
'comment': comment,
                'userCreator': userCreator?.toJson(),
'tags': tags?.toJson(),
'wizardNodes': wizardNodes?.map((item) => item.toJson())
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TFlowsResponse {
    List<TFlow?>? data;

    int? total;

    TFlowsResponse({ this.total, this.data });

    static TFlowsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TFlowsResponse(
            total: data['total'],
            data: data['data']?.map<TFlow>((item) => TFlow.toInstance(item)!).toList()
        );
    }
}
    
        