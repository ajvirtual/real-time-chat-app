
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_list_of_value.dart';
import 'package:flutter_login/entities/t_evaluation.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TEvaluationTemplate {
    
                
        TEvaluationTemplate({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.title,
this.description,
this.comment,
this.value,
this.isPublic,
this.correction,
this.tags,
this.evaluations });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? title;

String? description;

String? comment;

String? value;

bool? isPublic;

String? correction;

TListOfValue? tags;

List<TEvaluation>? evaluations;
                
        static TEvaluationTemplate? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TEvaluationTemplate(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
title: data['title'],
description: data['description'],
comment: data['comment'],
value: data['value'],
isPublic: data['isPublic'],
correction: data['correction'],
                userCreator: TUser.toInstance(data['userCreator']),
tags: TListOfValue.toInstance(data['tags']),
evaluations: data['evaluations']?.map<TEvaluation>((item) => TEvaluation.toInstance(item)!).toList()
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'title': title,
'description': description,
'comment': comment,
'value': value,
'isPublic': isPublic,
'correction': correction,
                'userCreator': userCreator?.toJson(),
'tags': tags?.toJson(),
'evaluations': evaluations?.map((item) => item.toJson())
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TEvaluationTemplatesResponse {
    List<TEvaluationTemplate?>? data;

    int? total;

    TEvaluationTemplatesResponse({ this.total, this.data });

    static TEvaluationTemplatesResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TEvaluationTemplatesResponse(
            total: data['total'],
            data: data['data']?.map<TEvaluationTemplate>((item) => TEvaluationTemplate.toInstance(item)!).toList()
        );
    }
}
    
        