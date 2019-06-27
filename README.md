# job Adaption
> 為了讓大家更認識自己 這是一款根據你的自傳判斷你適合職業的程式

## installation

### frontend
先在`root`根目錄，有出現`package.json`檔案的地方安裝依賴檔`node_modules`

安裝前端套件
``` javascript
npm install
```
### backend
再到`server`資料夾，有出現`package.json`檔案的地方安裝依賴檔`node_modules`

安裝後端套件
``` javascript
npm install
```

## env 
環境設定檔也要用好,要轉換env檔名,或者建立`.env`檔案

### frontend
在根目錄轉換成`.env`的檔名
``` javascript
cp .env.example .env
```

### backend
在`server`資料夾轉換成`.env`的檔名
``` javascript
cp .env.example .env
```

## usage 

這個需要架起`前端server`和`後端server`

### frontend
在根目錄啟動app
``` javascript
npm start
```

### backend
在`server`資料夾啟動後端app服務
``` javascript
npm run dev
```

之後在網址連結打[localhost:8080](http://localhost:8080)能看到內容

