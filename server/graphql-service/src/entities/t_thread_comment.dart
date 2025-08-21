
            
import 'package:flutter_login/entities/t_bookmark.dart';
import 'package:flutter_login/entities/t_thread.dart';
import 'package:flutter_login/entities/t_file.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TThreadComment {
    
                
        TThreadComment({ this.id,
this.createdAt,
this.updatedAt,
this.value,
this.reactions,
this.thread,
this.replies,
this.comment,
this.images,
this.files });
    
                int? id;

String? createdAt;

String? updatedAt;

String? value;

TBookmark? reactions;

TThread? thread;

List<TThreadComment>? replies;

TThreadComment? comment;

TFile? images;

TFile? files;
                
        static TThreadComment? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TThreadComment(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
value: data['value'],
                reactions: TBookmark.toInstance(data['reactions']),
thread: TThread.toInstance(data['thread']),
replies: data['replies']?.map<TThreadComment>((item) => TThreadComment.toInstance(item)!).toList(),
comment: TThreadComment.toInstance(data['comment']),
images: TFile.toInstance(data['images']),
files: TFile.toInstance(data['files'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'value': value,
                'reactions': reactions?.toJson(),
'thread': thread?.toJson(),
'replies': replies?.map((item) => item.toJson()),
'comment': comment?.toJson(),
'images': images?.toJson(),
'files': files?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TThreadCommentsResponse {
    List<TThreadComment?>? data;

    int? total;

    TThreadCommentsResponse({ this.total, this.data });

    static TThreadCommentsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TThreadCommentsResponse(
            total: data['total'],
            data: data['data']?.map<TThreadComment>((item) => TThreadComment.toInstance(item)!).toList()
        );
    }
}
    
        