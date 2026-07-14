# Progress Log

每次推送前，在此文件追加一条记录；`Changes` 说明用户可见的改动，`Diff` 记录受影响文件与增删行数。

## 2026-07-14 — `5a82acb` Add Africa archive and refine home layout

### Changes

- 补全非洲卷宗的数据、导航、首页文案与区域渲染逻辑。
- 调整欧洲档案的马赛克排版与筛选后的展示方式。
- 首页四个大洲卷宗采用 4+2 / 2+4 的交错拼版，移除右侧无意义留白。

### Diff

| File | Diff | Summary |
| --- | ---: | --- |
| `common.js` | +6 / -6 | 更新区域与界面文案。 |
| `data.js` | +341 / -14 | 扩充非洲及相关编年数据。 |
| `index.html` | +2 / -2 | 同步首页统计与搜索提示。 |
| `region.js` | +3 / -2 | 更新区域页面渲染。 |
| `style.css` | +189 / -0 | 加入欧洲卷宗布局及首页交错网格。 |

**Total:** +541 / -24 across 5 files.

## 2026-07-12 — `35e8254` Add Africa archive and redesign regional layouts

### Changes

- 新增非洲独立卷宗页面，并接入全站导航与检索。
- 扩充人物、时代与地区数据；调整画廊、首页和区域页以支持新增内容。
- 重做区域档案布局与欧洲卷宗的展示结构。

### Diff

| File group | Diff | Summary |
| --- | ---: | --- |
| `africa.html` | +67 / -0 | 新增非洲卷宗页面。 |
| `data.js` | +1675 / -52 | 新增和整理档案数据。 |
| `style.css` | +217 / -16 | 区域与档案布局重构。 |
| Other 11 files | +86 / -47 | 导航、画廊、首页与渲染逻辑同步。 |

**Total:** +2045 / -115 across 14 files.

## Entry Template

## YYYY-MM-DD — `commit-sha` Commit title

### Changes

- 用户可见的功能或界面改动。

### Diff

| File | Diff | Summary |
| --- | ---: | --- |
| `path/to/file` | +0 / -0 | 改动说明。 |

**Total:** +0 / -0 across 0 files.
