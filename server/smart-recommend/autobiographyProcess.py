# -*- coding: utf-8 -*-
"""
Created on Wed Jun 12 22:26:10 2019

@author: User
"""
import os
def readHobbyDict():
    hobby_list=[]
    file_path = os.path.abspath(os.path.join('./smart-recommend/hobby.txt'))
    fp = open(file_path, 'r', encoding='utf-8')
    line=fp.readline()
    line=line.strip('\n')
    line=line.encode('utf-8').decode('utf-8-sig')
    #print(word)
    while line:
        hobby_list.append(line)
        line=fp.readline()
        line=line.strip('\n')
        line=line.encode('utf-8').decode('utf-8-sig') 
    fp.close()
    return hobby_list
#print(hobby_list)
#hobby_list=[]
def getUserHobby(Filename):#user use
    userHobbyList=[]
    hobby_list=readHobbyDict()
    fp = open(Filename, 'r', encoding='utf-8')
    line=fp.readline()
    line=line.encode('utf-8').decode('utf-8-sig')
    while line:
        wordlist=line.split(' ')
        for item in wordlist:
            if item in hobby_list and item not in userHobbyList:
                userHobbyList.append(item)
        #print(wordlist)    
        line=fp.readline()
        line=line.encode('utf-8').decode('utf-8-sig')
    fp.close()
    return userHobbyList.copy()
def readSkillDict():
    skill_list=[]
    file_path = os.path.abspath(os.path.join('./smart-recommend/skill.txt'))
    fp = open(file_path, 'r', encoding='utf-8')
    line=fp.readline()
    line=line.strip('\n')
    line=line.encode('utf-8').decode('utf-8-sig')
    #print(word)
    while line:
        skill_list.append(line)
        line=fp.readline()
        line=line.strip('\n')
        line=line.encode('utf-8').decode('utf-8-sig') 
    fp.close()
    return skill_list.copy()
def getUserSkill(Filename):#user use
    userSkillList=[]
    skill_list=readSkillDict()
    fp = open(Filename, 'r', encoding='utf-8')
    line=fp.readline()
    line=line.encode('utf-8').decode('utf-8-sig')
    while line:
        wordlist=line.split(' ')
        for item in wordlist:
            if item in skill_list and item not in userSkillList:
                userSkillList.append(item)
        #print(wordlist)    
        line=fp.readline()
        line=line.encode('utf-8').decode('utf-8-sig')
    fp.close()
    return userSkillList.copy()