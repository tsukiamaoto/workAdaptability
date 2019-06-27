# -*- coding: utf-8 -*-
"""
Created on Wed Jun 12 22:30:40 2019

@author: User
"""
import os,sys
import json
#sys.path.remove("../bigData(執行區)")
file_path = os.path.abspath(os.path.join('./public/uploads/out.txt'))
#sys.path.append(file_path)
#print(sys.path)
from breakWord import cutWord
from autobiographyProcess import getUserHobby
from InterestWeightAndList import formWeightList,findInterestSymbol

def main(argv=None):
    # if argv is None:
    #     argv = sys.argv[0]
    #argv="test2.txt"
    inputFile = file_path
    #outputFile="test2_seg.txt"
    # etc., replacing sys.argv with argv in the getopt() call.
    userHobbyList=getUserHobby(cutWord(inputFile))#jieba_dict要和execute放在同一個資料夾
    weightList=formWeightList(userHobbyList)
    result=findInterestSymbol(userHobbyList)
    tmp={}
    tmp['interest_symbol']=result
    tmp['weight']=weightList.copy()
    tmp['user_hobby']=userHobbyList.copy()
    out = json.dumps(tmp)
    print(out,end="")
    # return out
if __name__ == "__main__":
   main()