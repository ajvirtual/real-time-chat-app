
            
import 'package:flutter_login/entities/t_bookmark.dart';
import 'package:flutter_login/entities/t_thread_comment.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TThread {
    
                
        TThread({ this.id,
this.createdAt,
this.updatedAt,
this.title,
this.description,
this.disableComment,
this.reactions,
this.comments });
    
                int? id;

String? createdAt;

String? updatedAt;

String? title;

String? description;

bool? disableComment;

TBookmark? reactions;

List<TThreadComment>? comments;
                
        static TThread? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TThread(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
title: data['title'],
description: data['description'],
disableComment: data['disableComment'],
                reactions: TBookmark.toInstance(data['reactions']),
comments: data['comments']?.map<TThreadComment>((item) => TThreadComment.toInstance(item)!).toList()
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'title': title,
'description': description,
'disableComment': disableComment,
                'reactions': reactions?.toJson(),
'comments': comments?.map((item) => item.toJson())
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TThreadsResponse {
    List<TThread?>? data;

    int? total;

    TThreadsResponse({ this.total, this.data });

    static TThreadsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TThreadsResponse(
            total: data['total'],
            data: data['data']?.map<TThread>((item) => TThread.toInstance(item)!).toList()
        );
    }
}
    
        