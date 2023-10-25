# InfrastSimUI

[InfrastSim](https://github.com/Funny-ppt/InfrastSim) 的 WebUI

## 运行方式

安装 .NET SDK 8、NodeJS

从 <https://github.com/Funny-ppt/InfrastSim> 生成 WASM：

```bash
git clone https://github.com/Funny-ppt/InfrastSim
cd InfrastSim
dotnet workload install wasm-tools
dotnet publish InfrastSimWasm
```

将 `InfrastSimWasm/bin/Release/net8.0/browser-wasm/AppBundle/_framework` 复制为此项目的 `public/assets`，并复制或软链接到 `src/wasm`

安装依赖，运行开发服务器：

```bash
npm ci
npm run dev
```
