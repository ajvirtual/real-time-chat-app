
            
import 'package:flutter_login/entities/t_user.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TListOfValue {
    
                
        TListOfValue({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.valueKey,
this.value,
this.color,
this.tp,
this.listOfValue,
this.listOfValues });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? valueKey;

String? value;

String? color;

String? tp;

TListOfValue? listOfValue;

TListOfValue? listOfValues;
                
        static TListOfValue? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TListOfValue(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
valueKey: data['valueKey'],
value: data['value'],
color: data['color'],
tp: data['tp'],
                userCreator: TUser.toInstance(data['userCreator']),
listOfValue: TListOfValue.toInstance(data['listOfValue']),
listOfValues: TListOfValue.toInstance(data['listOfValues'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'valueKey': valueKey,
'value': value,
'color': color,
'tp': tp,
                'userCreator': userCreator?.toJson(),
'listOfValue': listOfValue?.toJson(),
'listOfValues': listOfValues?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TListOfValuesResponse {
    List<TListOfValue?>? data;

    int? total;

    TListOfValuesResponse({ this.total, this.data });

    static TListOfValuesResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TListOfValuesResponse(
            total: data['total'],
            data: data['data']?.map<TListOfValue>((item) => TListOfValue.toInstance(item)!).toList()
        );
    }
}
    
        