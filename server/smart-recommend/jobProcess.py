# -*- coding: utf-8 -*-
"""
Created on Wed Jun 12 22:31:28 2019

@author: User
"""

#from gensim.models import word2vec
import os
from autobiographyProcess import getUserHobby,getUserSkill
from InterestWeightAndList import findInterestSymbol,model
#model = word2vec.Word2Vec.load("word2vec.model")#加載word2vec模型
    
def read_job_ability_list():
    tmp_dict={}
    tmp_list=[]
    job_list=[]
    file_path = os.path.abspath(os.path.join('./smart-recommend/job-distributed.txt'))
    fp = open(file_path, 'r', encoding='utf-8')
    line=fp.readline()
    line=line.strip('\n')
    line=line.encode('utf-8').decode('utf-8-sig')
    while line:
        if line[0:3]=="職業:":
            tmp_dict['job']="".join(line[3:])
        elif line[0:5]=="興趣代碼:":
            tmp_dict['interest_symbol']="".join(line[5:])
            tmp_dict['ability']=tmp_list.copy()
            job_list.append(tmp_dict.copy())
            tmp_list.clear()
            tmp_dict.clear()
        elif line=="能力:":
            pass
            #continue：強制跳出 ❮本次❯ 迴圈，繼續進入下一圈
            #pass：不做任何事情，所有的程式都將繼續
        else:
            tmp_list.append(line)
        line=fp.readline()
        line=line.strip('\n')
        line=line.encode('utf-8').decode('utf-8-sig') 
    fp.close()
    return job_list.copy()
def caculateJobScore(user_skill_list,job_dict):
    score=0
    for item in job_dict['ability']:
        for userskill in user_skill_list:
            score+=float(model.wv.similarity(userskill,item))
    return float(score/len(job_dict['ability']))

def get_job_score_dict(Filename):
    job_score_dict={}
    userHobbyList=getUserHobby(Filename)
    result=findInterestSymbol(userHobbyList)
    job_list=read_job_ability_list()
    user_skill_list=getUserSkill(Filename)
    tmplist0=[]
    for item in job_list:
        tmp_dict={}
        if correct_symbol_sequence_amount(result,item['interest_symbol'])==3:
            tmp_dict['job']="".join(item['job'])
            tmp_dict['score']=caculateJobScore(user_skill_list,item)
            tmp_dict['comment']="perfect"
            tmplist0.append(tmp_dict.copy())
            tmp_dict.clear()
    
    result_list0=[]    
    if len(tmplist0)==0:
        job_score_dict["perfect"]="None"
    else:
        result_list0=sorted(tmplist0,key= lambda tmplist0:tmplist0['score'],reverse=True)
        for i in range(0,(len(result_list0)-3)):
            result_list0.pop()
        job_score_dict["perfect"]=result_list0.copy()
        tmplist0.clear()
        result_list0.clear()
        
    tmplist1=[]
    tmplist2=[]
    for item in job_list:
        tmp_dict={}
        tmp=correct_symbol_amount(result,item['interest_symbol'])
        if tmp!=0:
            tmp_dict['job']="".join(item['job'])
            tmp_dict['score']=caculateJobScore(user_skill_list,item)
            if tmp==1:
                tmp_dict['comment']="well"
                tmplist1.append(tmp_dict.copy())
            elif tmp==2:
                tmp_dict['comment']="normal"
                tmplist2.append(tmp_dict.copy())
            tmp_dict.clear()
        
    if len(tmplist1)==0:
        job_score_dict["well"]="None"
    else:
        result_list1=sorted(tmplist1,key= lambda tmplist1:tmplist1['score'],reverse=True)
        for i in range(0,(len(result_list1)-3)):
            result_list1.pop()
        job_score_dict["well"]=result_list1.copy()
        tmplist1.clear()
        result_list1.clear()
        
    if len(tmplist2)==0:
        job_score_dict["normal"]="None"
    else:
        result_list2=sorted(tmplist2,key= lambda tmplist2:tmplist2['score'],reverse=True)
        for i in range(0,(len(result_list2)-3)):
            result_list2.pop()
        job_score_dict["normal"]=result_list2.copy()
        tmplist2.clear()
        result_list2.clear()
    
    return job_score_dict
        
def correct_symbol_amount(user_symbol,job_symbol):
    count=0
    for i in range(0,3):
        if job_symbol.find(user_symbol[i])!= -1:
            count+=1
    return count  

def correct_symbol_sequence_amount(user_symbol,job_symbol):
    count=0
    for i in range(0,3):
        if user_symbol[i]==job_symbol[i]:
            count+=1
    return count    

def recommend_job(Filename):
    output_list=[]
    job_score_dict=get_job_score_dict(Filename)
    count=0
    count=show_perfect(count,job_score_dict["perfect"],output_list)#count,
    count=show_well(count,job_score_dict["well"],output_list)#count,
    count=show_normal(count,job_score_dict["normal"],output_list)#count,
    return output_list
    
def show_perfect(count,perfect_list,output_list):#
    if perfect_list=="None":
        return count
    else:
        i=0
        while(count<3 and i<len(perfect_list)):
            # print(count)
            output_list.append(perfect_list[i]['job'])
            i+=1
            count+=1
        return count
    
def show_well(count,well_list,output_list):#
    if count<3:
        if well_list=="None":
            return count
        else:
            i=0
            while(count<3 and i<len(well_list)):
                output_list.append(well_list[i]['job'])
                i+=1
                count+=1
            return count
    return count
                    
def show_normal(count,normal_list,output_list):#
    if count<3:
        if normal_list=="None":
            return count
        else:
            i=0
            while(count<=3 and i<len(normal_list)):
                output_list.append(normal_list[i]['job'])
                i+=1
                count+=1
            return count
    return count