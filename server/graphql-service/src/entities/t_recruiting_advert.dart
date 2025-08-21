
            
import 'package:flutter_login/entities/t_user.dart';
import 'package:flutter_login/entities/t_thread.dart';
import 'package:flutter_login/entities/t_file.dart';
import 'package:flutter_login/entities/t_list_of_value.dart';
import 'package:flutter_login/entities/t_recruiting_curiculum_vitae.dart';
import 'package:flutter_login/entities/t_descriptor.dart';
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TRecruitingAdvert {
    
                
        TRecruitingAdvert({ this.id,
this.createdAt,
this.updatedAt,
this.userCreator,
this.title,
this.description,
this.mission,
this.profile,
this.dateEnd,
this.comment,
this.isPublished,
this.disableThread,
this.thread,
this.images,
this.tags,
this.cvs,
this.category,
this.state });
    
                int? id;

String? createdAt;

String? updatedAt;

TUser? userCreator;

String? title;

String? description;

String? mission;

String? profile;

String? dateEnd;

String? comment;

bool? isPublished;

bool? disableThread;

TThread? thread;

TFile? images;

TListOfValue? tags;

List<TRecruitingCuriculumVitae>? cvs;

TDescriptor? category;

TDescriptor? state;
                
        static TRecruitingAdvert? toInstance(Map<String, dynamic>? data) {
            if (data == null) {
                return null;
            }
            
            return TRecruitingAdvert(
                id: data['id'],
createdAt: data['createdAt'],
updatedAt: data['updatedAt'],
title: data['title'],
description: data['description'],
mission: data['mission'],
profile: data['profile'],
dateEnd: data['dateEnd'],
comment: data['comment'],
isPublished: data['isPublished'],
disableThread: data['disableThread'],
                userCreator: TUser.toInstance(data['userCreator']),
thread: TThread.toInstance(data['thread']),
images: TFile.toInstance(data['images']),
tags: TListOfValue.toInstance(data['tags']),
cvs: data['cvs']?.map<TRecruitingCuriculumVitae>((item) => TRecruitingCuriculumVitae.toInstance(item)!).toList(),
category: TDescriptor.toInstance(data['category']),
state: TDescriptor.toInstance(data['state'])
            );
        }
    
                
        Map<String, dynamic> toJson() {
            return {
                'id': id,
'createdAt': createdAt,
'updatedAt': updatedAt,
'title': title,
'description': description,
'mission': mission,
'profile': profile,
'dateEnd': dateEnd,
'comment': comment,
'isPublished': isPublished,
'disableThread': disableThread,
                'userCreator': userCreator?.toJson(),
'thread': thread?.toJson(),
'images': images?.toJson(),
'tags': tags?.toJson(),
'cvs': cvs?.map((item) => item.toJson()),
'category': category?.toJson(),
'state': state?.toJson()
            };
        }
    
            
}
    
            
/// ------------------
/// This file is generated. Do not attempt to modify manually, the modification will be overwrite at the next generation
/// ------------------
class TRecruitingAdvertsResponse {
    List<TRecruitingAdvert?>? data;

    int? total;

    TRecruitingAdvertsResponse({ this.total, this.data });

    static TRecruitingAdvertsResponse? toInstance(Map<String, dynamic>? data) {
        if (data == null) {
            return null;
        }
        
        return TRecruitingAdvertsResponse(
            total: data['total'],
            data: data['data']?.map<TRecruitingAdvert>((item) => TRecruitingAdvert.toInstance(item)!).toList()
        );
    }
}
    
        