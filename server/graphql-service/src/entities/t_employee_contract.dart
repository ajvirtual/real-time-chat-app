
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_file.dart';
import 'package:flutter_login/entities/t_list_of_value.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TEmployeeContract {
    
                
        TEmployeeContract({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.designation,
this.isPublic,
this.isActive,
this.file,
this.tags });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? designation;

bool? isPublic;

bool? isActive;

TFile? file;

TListOfValue? tags;
                
        static TEmployeeContract? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TEmployeeContract(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
designation: data['designation'],
isPublic: data['isPublic'],
isActive: data['isActive'],
                userCreator: TUser.toInstance(data['userCreator']),
file: TFile.toInstance(data['file']),
tags: TListOfValue.toInstance(data['tags'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'designation': designation,
'isPublic': isPublic,
'isActive': isActive,
                'userCreator': userCreator?.toJson(),
'file': file?.toJson(),
'tags': tags?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TEmployeeContractsResponse {
    List<TEmployeeContract?>? data;

    int? total;

    TEmployeeContractsResponse({ this.total, this.data });

    static TEmployeeContractsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TEmployeeContractsResponse(
            total: data['total'],
            data: data['data']?.map<TEmployeeContract>((item) => TEmployeeContract.toInstance(item)!).toList()
        );
    }
}
    
        