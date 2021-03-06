import getBasicTreeByParentUid from "../queries/getBasicTreeByParentUid";
import type { RoamBasicNode } from "../types/native";
import createBlock from "../writes/createBlock";
import toFlexRegex from "./toFlexRegex";

const getSubTree = ({
  key,
  parentUid,
  order = 0,
  tree = parentUid ? getBasicTreeByParentUid(parentUid) : [],
}: {
  key: string;
  parentUid?: string;
  tree?: RoamBasicNode[];
  order?: number;
}): RoamBasicNode => {
  const node = tree.find((s) => toFlexRegex(key).test(s.text.trim()));
  if (node) return node;
  const defaultNode = { text: "", children: [] };
  if (parentUid) {
    const uid = window.roamAlphaAPI.util.generateUID();
    createBlock({ node: { text: key, uid }, parentUid, order });
    return {
      uid,
      ...defaultNode,
    };
  }
  return { uid: "", ...defaultNode };
};

export default getSubTree;
