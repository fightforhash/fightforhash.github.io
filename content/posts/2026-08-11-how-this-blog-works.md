---
title: How this blog works
date: 2026-08-11
excerpt: Publishing a post is one markdown file and one commit — no CMS, no database, no API.
tags: [meta, workflow]
---

This site has no CMS. Every post is a markdown file in the repository, read at
build time, so publishing is the same motion as shipping code: add a file,
commit, push.

## Adding a post

Create a file under `content/posts/` named `YYYY-MM-DD-slug.md`:

```
content/posts/2026-08-11-how-this-blog-works.md
```

The date and slug come from the filename, so the URL for this post is
`/#/blog/how-this-blog-works`. Start the file with frontmatter:

```markdown
---
title: How this blog works
date: 2026-08-11
excerpt: One line that shows up in the post list.
tags: [meta, workflow]
---

Body starts here. Plain markdown.
```

Only `title` is really needed — everything else falls back to the filename or
an empty value. Then:

```bash
npm run build          # regenerates docs/
git add content/ docs/
git commit -m "post: how this blog works"
git push
```

GitHub Pages serves `main:/docs`, so the post is live about a minute later.

## What you get

Standard markdown plus GitHub-flavored extras — tables, task lists, strikethrough
— and syntax highlighting on fenced code blocks:

```python
from netmiko import ConnectHandler

with ConnectHandler(device_type="cisco_ios", host="10.0.0.1", username=user,
                    password=password) as conn:
    print(conn.send_command("show ip interface brief"))
```

Tables render as aligned console output, which is what most network notes
actually want:

| Port      | Status     | Vlan | Note                    |
| --------- | ---------- | ---- | ----------------------- |
| Gi0/1     | connected  | 10   | uplink to core          |
| Gi0/2     | notconnect | 20   | patch panel B-14 unused |

Korean works too — 한글 본문도 그대로 렌더됩니다.

## Why not Hashnode

Nothing against it. But posts on someone else's platform do not make *this*
site any more convincing, and a portfolio that links away is a portfolio that
ends. Keeping the writing in the repo means the site and the work share one
history, one backup, and one deploy.
