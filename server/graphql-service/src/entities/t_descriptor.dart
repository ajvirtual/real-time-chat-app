
            

    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TDescriptor {
    
                
        TDescriptor({ this.id,
this.descriptorKey,
this.value,
this.tp,
this.translationKey });
    
                int? id;

String? descriptorKey;

String? value;

String? tp;

Function? translationKey;
                
        static TDescriptor? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TDescriptor(
                id: data['id'],
descriptorKey: data['descriptorKey'],
value: data['value'],
tp: data['tp'],
translationKey: data['translationKey'],
                
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'descriptorKey': descriptorKey,
'value': value,
'tp': tp,
'translationKey': translationKey,
                
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TDescriptorsResponse {
    List<TDescriptor?>? data;

    int? total;

    TDescriptorsResponse({ this.total, this.data });

    static TDescriptorsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TDescriptorsResponse(
            total: data['total'],
            data: data['data']?.map<TDescriptor>((item) => TDescriptor.toInstance(item)!).toList()
        );
    }
}
    
        