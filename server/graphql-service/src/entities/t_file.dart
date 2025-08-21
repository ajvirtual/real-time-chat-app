
            

    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TFile {
    
                
        TFile({ this.id,
this.createdAt,
this.updatedAt });
    
                int? id;

String? createdAt;

String? updatedAt;
                
        static TFile? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TFile(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
                
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
                
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TFilesResponse {
    List<TFile?>? data;

    int? total;

    TFilesResponse({ this.total, this.data });

    static TFilesResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TFilesResponse(
            total: data['total'],
            data: data['data']?.map<TFile>((item) => TFile.toInstance(item)!).toList()
        );
    }
}
    
        