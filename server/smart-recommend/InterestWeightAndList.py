# -*- coding: utf-8 -*-
"""
Created on Wed Jun 12 22:27:27 2019

@author: User
"""
import os
import sys
from gensim.models import word2vec
from decimal import Decimal
import heapq
#import FindSymbol
file_path = os.path.abspath(os.path.join('./smart-recommend/word2vec.model'))
model = word2vec.Word2Vec.load(file_path)#加載word2vec模型

typeList=["A","C","E","I","R","S"]

#userHobbylist=[]
A_wordlist=[]
C_wordlist=[]
E_wordlist=[]
I_wordlist=[]
R_wordlist=[]
S_wordlist=[]
#sumList=[][A,C,E,I,R,S]
def readData(fileName,modifyList):
    fp = open(fileName, 'r', encoding='utf-8') #讀取使用者興趣斷詞/六型相關字典結果
    line=fp.readline()
    line=line.strip('\n')
    line=line.encode('utf-8').decode('utf-8-sig')
    while line:
        modifyList.append(line)
        line=fp.readline()
        line=line.strip('\n')
        line=line.encode('utf-8').decode('utf-8-sig')
    #print(modifyList)
    fp.close()
    
def caculateSumOfSimilarity(hobbyList,operationList):
    sumNum=0
    for item in operationList:
        for userhobby in hobbyList:
            sumNum+=float(model.wv.similarity(userhobby,item))#將numpy.float64轉為float
    return sumNum
def read():
    #readData('outputHobby.txt',userHobbylist)
    file_path = os.path.abspath(os.path.join('./smart-recommend'))
    readData(file_path+'/A2.txt',A_wordlist)
    readData(file_path+'/C2.txt',C_wordlist)
    readData(file_path+'/E2.txt',E_wordlist)
    readData(file_path+'/I2.txt',I_wordlist)
    readData(file_path+'/R2.txt',R_wordlist)
    readData(file_path+'/S2.txt',S_wordlist)
def formSumList(userHobbylist):
    read()
    sumList=[]    
    sum_A=caculateSumOfSimilarity(userHobbylist,A_wordlist)
    sum_C=caculateSumOfSimilarity(userHobbylist,C_wordlist)
    sum_E=caculateSumOfSimilarity(userHobbylist,E_wordlist)
    sum_I=caculateSumOfSimilarity(userHobbylist,I_wordlist)
    sum_R=caculateSumOfSimilarity(userHobbylist,R_wordlist)
    sum_S=caculateSumOfSimilarity(userHobbylist,S_wordlist)
    sumList.append(sum_A)
    sumList.append(sum_C)
    sumList.append(sum_E)
    sumList.append(sum_I)
    sumList.append(sum_R)
    sumList.append(sum_S)
    return sumList
    #print(sumList)
    
def sort_list_BigToSmall(operation_list):
    tmp=list(map(operation_list.index, heapq.nlargest(3, operation_list)))
    return tmp

def formWeightList(userHobbylist): #user use
    sumList=formSumList(userHobbylist)
    weightList=[]
    total=0
    for item in sumList:
        total+=item
    weightList.append(float(Decimal(str(sumList[0]/total)).quantize(Decimal('0.00'))))#4捨5入
    weightList.append(float(Decimal(str(sumList[1]/total)).quantize(Decimal('0.00'))))
    weightList.append(float(Decimal(str(sumList[2]/total)).quantize(Decimal('0.00'))))
    weightList.append(float(Decimal(str(sumList[3]/total)).quantize(Decimal('0.00'))))
    weightList.append(float(Decimal(str(sumList[4]/total)).quantize(Decimal('0.00'))))
    weightList.append(float(Decimal(str(sumList[5]/total)).quantize(Decimal('0.00'))))
    return weightList

def findInterestSymbol(userHobbylist):#user use
    max_num_index_list=sort_list_BigToSmall(formSumList(userHobbylist))
    return typeList[max_num_index_list[0]]+typeList[max_num_index_list[1]]+typeList[max_num_index_list[2]]

def getTypeList():
    return typeList