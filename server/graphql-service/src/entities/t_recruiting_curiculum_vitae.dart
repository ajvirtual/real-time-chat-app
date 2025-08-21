
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_descriptor.dart';
import 'package:flutter_login/entities/t_thread.dart';
import 'package:flutter_login/entities/t_recruiting_advert.dart';
import 'package:flutter_login/entities/t_file.dart';
import 'package:flutter_login/entities/t_evaluation.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TRecruitingCuriculumVitae {
    
                
        TRecruitingCuriculumVitae({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.name,
this.phone,
this.email,
this.adress,
this.school,
this.degree,
this.expirience,
this.comment,
this.state,
this.thread,
this.recrutingAdvert,
this.userEmployee,
this.profilePicture,
this.files,
this.evaluations });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? name;

String? phone;

String? email;

String? adress;

String? school;

String? degree;

String? expirience;

String? comment;

TDescriptor? state;

TThread? thread;

TRecruitingAdvert? recrutingAdvert;

TUser? userEmployee;

TFile? profilePicture;

TFile? files;

List<TEvaluation>? evaluations;
                
        static TRecruitingCuriculumVitae? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TRecruitingCuriculumVitae(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
name: data['name'],
phone: data['phone'],
email: data['email'],
adress: data['adress'],
school: data['school'],
degree: data['degree'],
expirience: data['expirience'],
comment: data['comment'],
                userCreator: TUser.toInstance(data['userCreator']),
state: TDescriptor.toInstance(data['state']),
thread: TThread.toInstance(data['thread']),
recrutingAdvert: TRecruitingAdvert.toInstance(data['recrutingAdvert']),
userEmployee: TUser.toInstance(data['userEmployee']),
profilePicture: TFile.toInstance(data['profilePicture']),
files: TFile.toInstance(data['files']),
evaluations: data['evaluations']?.map<TEvaluation>((item) => TEvaluation.toInstance(item)!).toList()
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'name': name,
'phone': phone,
'email': email,
'adress': adress,
'school': school,
'degree': degree,
'expirience': expirience,
'comment': comment,
                'userCreator': userCreator?.toJson(),
'state': state?.toJson(),
'thread': thread?.toJson(),
'recrutingAdvert': recrutingAdvert?.toJson(),
'userEmployee': userEmployee?.toJson(),
'profilePicture': profilePicture?.toJson(),
'files': files?.toJson(),
'evaluations': evaluations?.map((item) => item.toJson())
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TRecruitingCuriculumVitaesResponse {
    List<TRecruitingCuriculumVitae?>? data;

    int? total;

    TRecruitingCuriculumVitaesResponse({ this.total, this.data });

    static TRecruitingCuriculumVitaesResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TRecruitingCuriculumVitaesResponse(
            total: data['total'],
            data: data['data']?.map<TRecruitingCuriculumVitae>((item) => TRecruitingCuriculumVitae.toInstance(item)!).toList()
        );
    }
}
    
        