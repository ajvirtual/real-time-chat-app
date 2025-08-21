
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_flow.dart';
import 'package:flutter_login/entities/t_list_of_value.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TWizardNode {
    
                
        TWizardNode({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.nodeKey,
this.title,
this.description,
this.value,
this.comment,
this.flow,
this.tags });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? nodeKey;

String? title;

String? description;

String? value;

String? comment;

List<TFlow>? flow;

TListOfValue? tags;
                
        static TWizardNode? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TWizardNode(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
nodeKey: data['nodeKey'],
title: data['title'],
description: data['description'],
value: data['value'],
comment: data['comment'],
                userCreator: TUser.toInstance(data['userCreator']),
flow: data['flow']?.map<TFlow>((item) => TFlow.toInstance(item)!).toList(),
tags: TListOfValue.toInstance(data['tags'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'nodeKey': nodeKey,
'title': title,
'description': description,
'value': value,
'comment': comment,
                'userCreator': userCreator?.toJson(),
'flow': flow?.map((item) => item.toJson()),
'tags': tags?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TWizardNodesResponse {
    List<TWizardNode?>? data;

    int? total;

    TWizardNodesResponse({ this.total, this.data });

    static TWizardNodesResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TWizardNodesResponse(
            total: data['total'],
            data: data['data']?.map<TWizardNode>((item) => TWizardNode.toInstance(item)!).toList()
        );
    }
}
    
        