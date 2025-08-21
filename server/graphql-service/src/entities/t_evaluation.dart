
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_evaluation_template.dart';
import 'package:flutter_login/entities/t_recruiting_curiculum_vitae.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TEvaluation {
    
                
        TEvaluation({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.email,
this.objet,
this.message,
this.value,
this.result,
this.isFinished,
this.evaluationTemplate,
this.cv });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? email;

String? objet;

String? message;

String? value;

String? result;

bool? isFinished;

TEvaluationTemplate? evaluationTemplate;

TRecruitingCuriculumVitae? cv;
                
        static TEvaluation? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TEvaluation(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
email: data['email'],
objet: data['objet'],
message: data['message'],
value: data['value'],
result: data['result'],
isFinished: data['isFinished'],
                userCreator: TUser.toInstance(data['userCreator']),
evaluationTemplate: TEvaluationTemplate.toInstance(data['evaluationTemplate']),
cv: TRecruitingCuriculumVitae.toInstance(data['cv'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'email': email,
'objet': objet,
'message': message,
'value': value,
'result': result,
'isFinished': isFinished,
                'userCreator': userCreator?.toJson(),
'evaluationTemplate': evaluationTemplate?.toJson(),
'cv': cv?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TEvaluationsResponse {
    List<TEvaluation?>? data;

    int? total;

    TEvaluationsResponse({ this.total, this.data });

    static TEvaluationsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TEvaluationsResponse(
            total: data['total'],
            data: data['data']?.map<TEvaluation>((item) => TEvaluation.toInstance(item)!).toList()
        );
    }
}
    
        