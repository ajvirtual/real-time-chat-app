
            

    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TSessionUserDate {
    
                
        TSessionUserDate({ this.id,
this.dateBegin,
this.dateEnd });
    
                int? id;

String? dateBegin;

String? dateEnd;
                
        static TSessionUserDate? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TSessionUserDate(
                id: data['id'],
dateBegin: data['dateBegin'],
dateEnd: data['dateEnd'],
                
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'dateBegin': dateBegin,
'dateEnd': dateEnd,
                
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TSessionUserDatesResponse {
    List<TSessionUserDate?>? data;

    int? total;

    TSessionUserDatesResponse({ this.total, this.data });

    static TSessionUserDatesResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TSessionUserDatesResponse(
            total: data['total'],
            data: data['data']?.map<TSessionUserDate>((item) => TSessionUserDate.toInstance(item)!).toList()
        );
    }
}
    
        