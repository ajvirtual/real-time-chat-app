
            
import 'package:flutter_login/entities/t_file.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TDocumentTemplate {
    
                
        TDocumentTemplate({ this.id,
this.createdAt,
this.updatedAt,
this.ke,
this.name,
this.description,
this.isActive,
this.file });
    
                int? id;

String? createdAt;

String? updatedAt;

String? ke;

String? name;

String? description;

bool? isActive;

TFile? file;
                
        static TDocumentTemplate? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TDocumentTemplate(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
ke: data['ke'],
name: data['name'],
description: data['description'],
isActive: data['isActive'],
                file: TFile.toInstance(data['file'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'ke': ke,
'name': name,
'description': description,
'isActive': isActive,
                'file': file?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TDocumentTemplatesResponse {
    List<TDocumentTemplate?>? data;

    int? total;

    TDocumentTemplatesResponse({ this.total, this.data });

    static TDocumentTemplatesResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TDocumentTemplatesResponse(
            total: data['total'],
            data: data['data']?.map<TDocumentTemplate>((item) => TDocumentTemplate.toInstance(item)!).toList()
        );
    }
}
    
        