# keel.specul.com

龙骨（Keel）产品门户：Keel 3D + Keel 2D。

- `index.html` — 产品首页  
- `3d/` — 由 `keel3d/dist` 同步（演示 + hub）  
- `2d/` — 预留  
- `sync-3d.mjs` — 同步脚本  

## 更新演示

```bash
cd ../keel3d
npm run build
cd ../keel.specul
node sync-3d.mjs
```

部署：将本目录（含 `3d/`）上传到静态托管 / Pages，域名 `keel.specul.com`。
