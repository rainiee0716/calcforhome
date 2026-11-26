# 外链已发清单（Sent Log）— 唯一归集表

**规则**：任何平台每次发布后，往本文件追加一行（日期、平台、链接、锚文本/内容、状态）。定时任务跑完也必须更新本文件并 git commit。
**目标页池（轮换使用）**：
- A `/concrete-bags-calculator/`（锚文本 concrete bags calculator）
- B `/concrete-slab-cost-calculator/`（锚文本 concrete slab cost calculator）
- C `/how-many-bags-of-concrete-in-a-yard/`（锚文本 how many bags of concrete in a yard）
- D `/how-much-gravel-do-i-need/`（锚文本 how much gravel do i need）
- E `/sonotube-calculator/`（锚文本 sonotube calculator）

## 已发记录

| 日期 | 平台 | 链接/位置 | 指向 | 状态 |
|---|---|---|---|---|
| 11-20 | lilachbullock 表单 | 客座 pitch（guest post 分类） | A+B | 已提交等回复 |
| 11-20 | worldculator 表单 | 工具收录建议 | A | 已提交（收到确认✓） |
| 11-20 | roohome（邮件） | 客座 pitch | A+B | 已发等回复 |
| 11-20 | homoper（邮件） | 客座 pitch | C | 已发等回复 |
| 11-20 | calculatingconcrete（邮件） | 盘点收录申请 | B+C | 已发等回复 |
| 11-20 | concretecalcs（邮件） | 资源推荐 | C | 已发等回复 |
| 11-22 | thehomeimproving（邮件） | 客座 pitch | B | 已发等回复 |
| 11-22 | slabcalc（邮件） | 盘点收录申请 | B | 已发等回复 |
| 11-23 | agreenhand（邮件） | 客座 pitch（gravel 选题） | D | 已发等回复 |
| 11-23 | dev.to | 文章 How Many Bags of Concrete in a Yard（bags/slab-cost 链接） | A+C+首页 | ✅ 已上线 |
| 11-23 | GitHub 仓库 | README + Website 字段 + description | 首页 | ✅ 已上线（dofollow） |
| 11-24 | Substack | 文章 What a Concrete Slab Actually Costs in 2026（slab-cost/yard/bags 链接） | B+C+A | ✅ 已上线（calcforhome.substack.com/p/what-a-concrete-slab-actually-costs） |
| 11-25 | Quora | 答案：80lb bags per cubic yard 问题 | C | 已发布（新账号审核中，链接待放行） |
| 11-26 | dev.to | 文章 Sonotube Footings: How Much Concrete Per Tube | E+A+frost hub | ✅ 已上线（dev.to/.../sonotube-footings-...-2m4k） |
| 11-26 | theconcretetalk（邮件） | 客座 pitch（混凝土垂直站，最对口） | B+C | 已发等回复 |

## 各平台账号速查

| 平台 | 账号 | 登录方式 |
|---|---|---|
| dev.to | cc_df91c4a3f6d5a15f18577 | Google 登录（IAB 会话已通），发文入口 dev.to/new |
| Substack | Rainiee · CalcForHome（calcforhome.substack.com） | Google 登录，发文入口 /publish/post |
| Quora | Cc 陈（rainiee0716@gmail.com） | 浏览器已有会话 |
| SaaSHub | calcforhome / rainiee@calcforhome.com / Cfh#2026calc! | 已验证登录 |
| ImprovMX | rainiee0716@gmail.com / Cfh#2026calc! | 已配置 rainiee@calcforhome.com 通配转发 |
| GitHub | rainiee0716（本机 keychain 有凭据，API 可用） | gh 无 CLI，用 git credential fill 取 token |
| **Blogger** | CalcForHome Field Notes（calcforhome.blogspot.com）/ Google 登录 / Cfh#2026calc! 同密码 | ✅ 建成。首篇文章：11-24、11-26 两次自动点击均被弹窗拦截——**需用户在 IAB 手动点左侧栏"新建博文"**（真人环境可能直接弹出），或桌面 Chrome 发 |
| Hackernoon/Tumblr | 待注册（Google 登录可通） | 每周任务尝试 |

## 锚文本与质量红线

- 锚文本用完整词组（上表 A~E 对应），不用 here/this tool
- 每篇正文 2~3 条链接封顶；同主题跨平台必须改写 30%+
- 不买链接、不进链轮、付费位必须 nofollow/sponsored 标注
- Quora 答案必须实质回答问题（完整换算+实务建议），链接只放 1 条自然带出
