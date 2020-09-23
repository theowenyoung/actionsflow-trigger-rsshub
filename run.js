module.exports = async function ({ triggerOptions, rsshub, config }) {
  const options = triggerOptions;
  const rsshubConfig = options.rsshubConfig || {};
  if (!options.path) {
    throw new Error("you must provide a path");
  }
  let sources = [];
  if (Array.isArray(options.path)) {
    sources = options.path;
  } else {
    sources = [options.path];
  }
  if (sources.length < 1) {
    throw new Error("you must provide one path at least!");
  }
  const globalQuery = options.globalQuery || {};
  const globalQueryObj = new URLSearchParams(globalQuery);
  const globalQueryString = globalQueryObj.toString();
  rsshub.init(rsshubConfig);
  for (let i = 0; i < sources.length; i++) {
    if (typeof sources[i] === "string") {
      sources[i] = { path: sources[i] };
    }
    let finalUrlObj = new URL(sources[i].path, "https://example.org");
    const query = sources[i].query || {};
    const queryObj = new URLSearchParams(query);
    const queryString = queryObj.toString();
    const urlQueryString = finalUrlObj.searchParams.toString();
    let allQueryString = "";

    if (globalQueryString) {
      allQueryString = `${globalQueryString}`;
    }
    if (queryString) {
      if (allQueryString) {
        allQueryString = `${allQueryString}&${queryString}`;
      } else {
        allQueryString = `${queryString}`;
      }
    }
    if (urlQueryString) {
      if (allQueryString) {
        allQueryString = `${allQueryString}&${urlQueryString}`;
      } else {
        allQueryString = `${urlQueryString}`;
      }
    }
    finalUrlObj.search = new URLSearchParams(allQueryString);

    const finalUrl = finalUrlObj.pathname + finalUrlObj.search;
    let data = await rsshub.get(finalUrl);
    const items = [];
    if (data.item) {
      data.item.forEach((item) => {
        if (data.title) {
          item.__channel_title = data.title;
        }
        if (data.link) {
          item.__channel_link = data.link;
        }
        if (data.description) {
          item.__channel_description = data.description || data.title;
        }
        if (item.title) {
          item.title = item.title.trim();
          // trim title length
          for (let length = 0, i = 0; i < item.title.length; i++) {
            length += Buffer.from(item.title[i]).length !== 1 ? 2 : 1;
            if (length > config.titleLengthLimit) {
              item.title = `${item.title.slice(0, i)}...`;
              break;
            }
          }
        }

        if (item.enclosure_length) {
          const itunes_duration =
            Math.floor(item.enclosure_length / 3600) +
            ":" +
            (Math.floor((item.enclosure_length % 3600) / 60) / 100)
              .toFixed(2)
              .slice(-2) +
            ":" +
            (((item.enclosure_length % 3600) % 60) / 100).toFixed(2).slice(-2);
          item.itunes_duration = itunes_duration;
        }
        items.push(item);
      });
    }
    return items;
  }
};
