import * as components from "./components";
import * as date from "./date";
import * as dom from "./dom";
import * as events from "./events";
import * as hooks from "./hooks";
import * as marked from "./marked";
import * as queries from "./queries";
import * as types from "./types";
import * as util from "./util";
import * as writes from "./writes";

window.roamjs = window.roamjs || {
  extension: {},
  dynamicElements: new Set(),
  version: {},
  loaded: new Set(["components"]),
};

window.roamjs.extension.components = {
  components,
  date,
  dom,
  events,
  hooks,
  marked,
  queries,
  types,
  util,
  writes,
  tests: {
    limit: () => {
      Promise.all(
        Array(20)
          .fill(null)
          .map((_, i) =>
            writes.createPage({
              title: `Test page ${i}`,
              tree: Array(i + 10)
                .fill(null)
                .map((_, j) => ({ text: `Block ${j}` })),
            })
          )
      ).then(() => console.log("Okay I'm done"));
    },
    cleanup: () => {
      Promise.all(
        Array(20)
          .fill(null)
          .map((_, i) =>
            window.roamAlphaAPI.deletePage({
              page: { uid: queries.getPageUidByPageTitle(`Test page ${i}`) },
            })
          )
      ).then(() => console.log("Okay I'm done"));
    },
  },
};
