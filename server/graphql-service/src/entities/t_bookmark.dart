
            

    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TBookmark {
    
                
        TBookmark({ this.id,
this.createdAt,
this.updatedAt,
this.type,
this.value,
this.entity,
this.entityId });
    
                int? id;

String? createdAt;

String? updatedAt;

String? type;

String? value;

String? entity;

String? entityId;
                
        static TBookmark? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TBookmark(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
type: data['type'],
value: data['value'],
entity: data['entity'],
entityId: data['entityId'],
                
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'type': type,
'value': value,
'entity': entity,
'entityId': entityId,
                
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TBookmarksResponse {
    List<TBookmark?>? data;

    int? total;

    TBookmarksResponse({ this.total, this.data });

    static TBookmarksResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TBookmarksResponse(
            total: data['total'],
            data: data['data']?.map<TBookmark>((item) => TBookmark.toInstance(item)!).toList()
        );
    }
}
    
        