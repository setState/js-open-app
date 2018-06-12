# js-open-app
h5分享页面打开本地存在的app,
当本地app不存在的时候则跳转到响应的下载页面.对于安卓手机跳转到应用宝下载页面,ios手机则跳转到应用市场
## 使用
直接引用：下载/dist/bundle.js到工程中即可调用h5OpenAppControl.controlInit({...参数...})方法完成跳转<br>
```javascript
<script src="dist/bundle.js"></script>
```
npm: 通过npm引入然后直接调用controlInit({...参数...})完成跳转

```javascript 
import {controlInit} from 'nw-app-comic'

```
| 参数属性 | 类型 | 描述 |
| --- | --- | --- |
| `button` | `dom` | `按钮` |
| `androidLink` | `string` | `安卓的打开链接` |
| `androidDownloadUrl` | `string` | `安卓的下载链接,开启应用宝的时候这个配置没有用` |
| `androidYyb| `Boolean` | ` android 是否开启应用宝下载` |
| `iosLink` | `string` | `ios 打开链接` |
| `iosDownloadUrl` | `string` | `ios 的下载链接` |
| `iosUniversalLinkEnabled| `Boolean` | `是否开启 Universal Link` |
| `iosYyb| `Boolean` | `ios 是否开启应用宝下载` |
| `yybDownloadUrl` | `string` | `应用宝下载链接` |
| `autoRedirectToDownloadUrl| `Boolean` | `是否如果没有打开app则自动跳转到下载页面` |
