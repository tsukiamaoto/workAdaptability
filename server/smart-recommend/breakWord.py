# -*- coding: utf-8 -*-
"""
Created on Wed Jun 12 22:29:52 2019

@author: User
"""
import os
import jieba
import logging

def cutWord(input_file):

    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

    # jieba custom setting.
    path=os.path.abspath(os.path.join('./smart-recommend/jieba_dict/dict.txt.big'))
    jieba.set_dictionary(path)

    # load stopwords set
    stopword_set = set()
    path=os.path.abspath(os.path.join('./smart-recommend/jieba_dict/stop_words.txt'))
    with open(path,'r', encoding='utf-8') as stopwords:
        for stopword in stopwords:
            stopword_set.add(stopword.strip('\n'))

    outputFile="autograph_seg.txt"
    output = open(outputFile, 'w', encoding='utf-8')
    with open(input_file, 'r', encoding='utf-8') as content :
        for texts_num, line in enumerate(content):
            line = line.strip('\n')
            line=line.replace('\n', '').replace('/', '').replace('(', '').replace(')', '').replace(']', '').replace('[', '').replace('.', '').replace('\n', '').replace(' ', '').replace(u'\u3000',u'').replace('，', '').replace('。', '').replace('？', '').replace('！', '').replace('“', '').replace('”', '').replace('：', '').replace('…', '').replace('（', '').replace('）', '').replace('—', '').replace('《', '').replace('》', '').replace('、', '').replace('‘', '').replace('’', '').replace('「', '').replace('」', '').replace('◎', '').replace(u'\xa0', u'').replace('．', '')
            line=str(line)
            words = jieba.cut(line, cut_all=False)
            for word in words:
                #if word.isdigit()==True:
                    #word=word.remove(item)
                if word not in stopword_set:
                    if word.isdigit()==False:
                        output.write(word + ' ')
            output.write('\n')

            if (texts_num + 1) % 10000 == 0:
                logging.info("已完成前 %d 行的斷詞" % (texts_num + 1))
    output.close()
    return outputFile