import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

## STEP 4 — GitHub에 파일 올리기

1. 방금 만든 `gongbu-jipsa` 저장소 페이지로 가요
2. **"Add file"** 버튼 클릭 → **"Upload files"** 클릭
3. 아래 파일들을 끌어다 놓기 (드래그앤드롭)
```
📁 올려야 할 파일들:
- package.json
- index.html
- App.jsx
- main.jsx
```

4. 아래 **"Commit changes"** 초록 버튼 클릭

그런데 잠깐! GitHub는 폴더 구조가 필요해요.
`index.html`은 최상위에, `App.jsx`와 `main.jsx`는 `src` 폴더 안에 있어야 해요.

폴더째로 올리려면:

1. 내 컴퓨터 바탕화면에 `gongbu-jipsa`라는 폴더 만들기
2. 그 안에 `src` 폴더 만들기
3. 파일 배치:
```
gongbu-jipsa/
  ├── index.html
  ├── package.json
  └── src/
      ├── App.jsx
      └── main.jsx