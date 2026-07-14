# Progress Log

每次推送前，在此文件追加一条记录；`Changes` 说明用户可见的改动，`Diff` 同时记录受影响文件、增删行数，以及代码实际改变的行为。

## 2026-07-14 — [`5a82acb`](https://github.com/eugeneeeee1123/history/commit/5a82acb4b1582a8be7d63b85171fd7ce6940fa1c) Add Africa archive and refine home layout

### Changes

- 补全欧洲卷宗的数据，并同步首页、搜索与画廊的统计文案。
- 调整欧洲档案的马赛克排版与筛选后的展示方式。
- 首页四个大洲卷宗采用 4+2 / 2+4 的交错拼版，移除右侧无意义留白。

### Diff

| File | Diff | Summary |
| --- | ---: | --- |
| `common.js` | +6 / -6 | 将全站统计从 163 人 / 68 时代更新为 174 人 / 73 时代，中英文同步。 |
| `data.js` | +341 / -14 | 补入欧洲时代、人物资料，并更新欧洲卷宗简介。 |
| `index.html` | +2 / -2 | 修正首页静态搜索提示和 Hero 人物总数。 |
| `region.js` | +3 / -2 | 向档案容器写入当前文明键、筛选状态和时代序号。 |
| `style.css` | +189 / -0 | 加入欧洲 6×6 马赛克规则、筛选回退流式布局和首页交错拼版。 |

#### Diff details

- `data.js`：将凯撒从「罗马帝国」拆分到「共和国末期」，新增亚瑟王、梅林、文艺复兴、宗教改革、科学革命与启蒙运动等条目，以及达·芬奇、米开朗琪罗、路德、加尔文、牛顿、伏尔泰、卢梭、路易十六与瓦特的人物档案。
- `region.js` + `style.css`：欧洲主卷宗以 2 个大板块、3 个中板块和 6 个小板块完整铺成正方形；用户启用人物筛选后自动切回可读的普通网格，避免隐藏卡片留下空洞。
- `style.css`：首页四张大洲卡由同样宽的 4 格卡改为 `4+2 / 2+4` 的交错排列，填满原先最右侧空白。

**Total:** +541 / -24 across 5 files.

## 2026-07-12 — [`35e8254`](https://github.com/eugeneeeee1123/history/commit/35e8254c4b677c957d9351a8f6844160eb6c4b20) Add Africa archive and redesign regional layouts

### Changes

- 新增非洲独立卷宗页面，并接入全站导航与检索。
- 扩充人物、时代与地区数据；调整画廊、首页和区域页以支持新增内容。
- 重做区域档案布局与欧洲卷宗的展示结构。

### Diff

| File group | Diff | Summary |
| --- | ---: | --- |
| `africa.html` | +67 / -0 | 新增使用共享搜索、抽屉和区域渲染器的非洲卷宗页面。 |
| `data.js` | +1675 / -52 | 新增非洲、南亚、波斯、奥斯曼及美洲补充时代和人物资料。 |
| `style.css` | +217 / -16 | 将区域页和人物画廊改为带不同卡片尺寸的响应式档案拼版。 |
| Other 11 files | +86 / -47 | 将「非洲」接入全站导航、翻译、检索、首页统计及渲染逻辑。 |

#### Diff details

- 所有已有页面的导航栏新增「非洲」入口；`common.js` 将区域列表从 3 个扩展为 4 个，并把首页、搜索和画廊总数从 121 人 / 46 时代更新为 163 人 / 68 时代。
- `region.js`：移除固定侧栏式的时代展示，按亚洲、欧洲、美洲、非洲分别分配不同尺寸的时代卡；英雄区改为区域符号背景，筛选与时代索引改为横向控制区。
- `gallery.js` + `style.css`：人物卡按 feature / portrait / wide 等节奏排布，添加空结果状态和尊重「减少动态效果」设置的滚动入场动画。
- `africa.html`：新增可独立访问的非洲档案页，并复用既有搜索、时代详情和人物详情抽屉。

**Total:** +2045 / -115 across 14 files.

## 2026-07-07 — [`9e614c7`](https://github.com/eugeneeeee1123/history/commit/9e614c73c9a687dc0a3c478b51003e4a16c11355) Initial commit

### Changes

- 建立「史阅 · THE ARCHIVUM」静态多页面网站的首个可用版本。
- 创建首页、亚洲、欧洲、美洲、人物画廊、关于与联系页面，以及各页面的交互脚本。
- 引入文明、时代与人物档案数据，并补充原始内容、路线图和完整视觉样式。

### Diff

| File group | Diff | Summary |
| --- | ---: | --- |
| `data.js` | +4798 / -0 | 建立文明、时代、人物、评分和分类数据集。 |
| `content.md` | +2884 / -0 | 添加各时代与人物的档案内容原稿。 |
| 7 个页面 HTML | +601 / -0 | 创建首页、亚洲、欧洲、美洲、画廊、关于与联系页。 |
| 5 个交互脚本 | +721 / -0 | 创建共享导航、检索、区域渲染、画廊、首页和联系表单行为。 |
| `style.css` | +582 / -0 | 创建深色档案视觉系统、响应式布局、抽屉与状态样式。 |
| `roadmap.md` | +51 / -0 | 添加项目路线图。 |

#### Diff details

- `index.html` + `home.js`：建立首页 Hero、统计栏、洲际卷宗入口、更多内容卡和跨文明时间线。
- `asia.html`、`europe.html`、`americas.html` + `region.js`：建立三大区域的时代目录、人物筛选、时代详情与人物详情抽屉。
- `gallery.html` + `gallery.js`：建立按大洲与身份筛选的人物总览；`about.html`、`contact.html` + `contact.js` 补充项目说明和可提交的联系表单状态。
- `common.js`：建立中英文切换、全站检索、动态徽章和抽屉交互；`style.css`：定义颜色、字体、导航、卡片、抽屉及移动端适配。

**Total:** +9637 / -0 across 16 files.

## Entry Template

## YYYY-MM-DD — `commit-sha` Commit title

### Changes

- 用户可见的功能或界面改动。

### Diff

| File | Diff | Summary |
| --- | ---: | --- |
| `path/to/file` | +0 / -0 | 改动说明。 |

#### Diff details

- 写明具体变更：改了哪些数据、元素、交互或布局，以及用户会看到什么不同。

**Total:** +0 / -0 across 0 files.
