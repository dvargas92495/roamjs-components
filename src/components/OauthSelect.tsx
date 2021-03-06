import { Label } from "@blueprintjs/core";
import React, { useState } from "react";
import getPageUidByPageTitle from "../queries/getPageUidByPageTitle";
import getBasicTreeByParentUid from "../queries/getBasicTreeByParentUid";
import toFlexRegex from "../util/toFlexRegex";
import MenuItemSelect from "./MenuItemSelect";

export const useOauthAccounts = (
  id: string
): {
  accountDropdown: React.ReactElement;
  accountLabel: string;
} => {
  const accountLabels = (
    getBasicTreeByParentUid(getPageUidByPageTitle(`roam/js/${id}`)).find((t) =>
      toFlexRegex("oauth").test(t.text)
    )?.children || []
  )
    .map((t) => t.text)
    .filter((t) => !t.startsWith("{") && !t.endsWith("}"));
  const [accountLabel, setAccountLabel] = useState(accountLabels[0] || "");
  const accountDropdown = (
    <>
      {accountLabels.length > 1 && (
        <Label>
          Account:
          <MenuItemSelect
            activeItem={accountLabel}
            onItemSelect={(i) => setAccountLabel(i)}
            items={accountLabels}
          />
        </Label>
      )}
    </>
  );
  return {
    accountDropdown,
    accountLabel,
  };
};
