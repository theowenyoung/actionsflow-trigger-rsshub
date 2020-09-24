# `@actionsflow/trigger-rsshub`

This is an [Actionsflow](https://github.com/actionsflow/actionsflow) [`rsshub`](https://github.com/DIYgod/RSSHub) trigger. With this trigger, you can easily get rsshub updates.

## Install

```bash
npm i @actionsflow/trigger-rsshub
```

# Usage

Single path:

```yaml
on:
  rsshub:
    path: /smzdm/keyword/女装
```

Multiple paths:

```yaml
on:
  rsshub:
    path:
      - /smzdm/keyword/女装
      - /36kr/news/latest
    config:
      limit: 15
```

## Options

- `path`, required, `string` or `string[]`, when `path` is `string[]`, then multiple rsshub feeds can trigger the action. For path value, you should check at [rsshub](https://docs.rsshub.app/), all rsshub routes are supported.

- `globalQuery`, optional, `object`, rsshub global query, it will set to every rsshub request search. For example: `{"limit":10,"filter":"test"}`, for more query params, please see [here](https://docs.rsshub.app/parameter.html)

- `rsshubConfig`, optional, `object`, rsshub init config, for more config settings, please see [here](https://docs.rsshub.app/install/#pei-zhi)

> You can use [General Config for Actionsflow Trigger](https://actionsflow.github.io/docs/workflow/#ontriggerconfig) for more customization.

## Outputs

An outputs example:

```json
{
  "title": "UNIQLO 优衣库 426026 女士牛仔抽绳连衣裙 - 79元",
  "description": "UNIQLO 优衣库 426026 女士牛仔抽绳连衣裙 ，采用100%棉质，舒适透气，款型舒适，腰部附带抽绳，便于调节松紧度。下单到手价79元，近期好价，喜欢的可以购买了。<br>天猫精选<br><img src=\"http://qny.smzdm.com/202003/24/5e796b40660e23474.jpg_d200.jpg\" referrerpolicy=\"no-referrer\">",
  "pubDate": "Wed, 23 Sep 2020 16:40:00 GMT",
  "link": "https://www.smzdm.com/p/25102718/",
  "__channel_title": "女装 - 什么值得买",
  "__channel_link": "http://search.smzdm.com/?c=home&s=%E5%A5%B3%E8%A3%85&order=time&v=b"
}
```

You can use the outputs like this:

```yaml
on:
  rsshub:
    path: /smzdm/keyword/女装
jobs:
  print:
    name: Print
    runs-on: ubuntu-latest
    steps:
      - name: Print Outputs
        env:
          title: ${{on.rss.outputs.title}}
          description: ${{on.rss.outputs.description}}
          link: ${{on.rss.outputs.link}}
        run: |
          echo title: $title
          echo description: $description
          echo link: $link
```
