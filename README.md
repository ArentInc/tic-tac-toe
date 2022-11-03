# Tic Tac Toe

## 実行環境

- [Node.js](https://nodejs.org/) 16.18.3 以降

## 実行手順

アプリケーションを実行するための手順

### 0. ターミナルを起動

ターミナルを起動し本リポジトリを開いてください。使用するターミナルは cmd / PowerShell どちらでも問題ありません。

### 1. パッケージインストール

```
npm i
```

### 2. アプリケーション起動

```
npm run start
```

### 3. ブラウザで確認

http://localhost:3000 をブラウザで開くとアプリケーションが利用できます。

## 構成

アプリケーションのソースコードはほぼすべて App.tsx に記載しています。

```
|-- README.md
|-- package-lock.json
|-- package.json
|-- public
|   |-- favicon.ico
|   |-- index.html
|   |-- manifest.json
|   `-- robots.txt
|-- src
|   |-- App.css     <= アプリケーションのスタイルシート
|   |-- App.tsx     <= アプリケーション本体
|   |-- index.css
|   |-- index.tsx
|   `-- react-app-env.d.ts
`-- tsconfig.json
```

## 参考リンク

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)