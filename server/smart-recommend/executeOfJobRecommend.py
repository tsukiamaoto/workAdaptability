# -*- coding: utf-8 -*-
"""
Created on Wed Jun 12 22:38:28 2019

@author: User
"""
import os,sys
import json
import re
#print(sys.path)
file_path = os.path.abspath(os.path.join('./public/uploads/out.txt'))
# file_path = os.path.abspath(os.path.join('../public/uploads/out.txt'))
# sys.path.append(file_path)
from jobProcess import recommend_job
from autobiographyProcess import getUserSkill
from breakWord import cutWord


def main(argv=None):
    #if argv is None:
        #argv = sys.argv[0]
    #argv="test2.txt"
    inputFile = file_path
    #outputFile="test2_seg.txt"
    # etc., replacing sys.argv with argv in the getopt() call.
    user_skill_list=getUserSkill(cutWord(inputFile))#jieba_dict要和execute放在同一個資料夾
    #print(user_skill_list)
    recommendJob=recommend_job(cutWord(inputFile))

    str_recommend=""
    for item in recommendJob:
        str_recommend += "".join(item+"/")
    splits_recommend = re.split(r'[/／]',str_recommend)
    splits_recommend.pop()
    tmp={}
    tmp['skills']=user_skill_list.copy()
    tmp['recommend_jobs']=splits_recommend.copy()
    # print(tmp)
    out = json.dumps(tmp)
    print(out,end="")
    # return out
if __name__ == "__main__":
    main()
