import React, { useCallback, useState } from "react";
import { Alert, Checkbox, Classes } from "@blueprintjs/core";
import createOverlayRender from "../util/createOverlayRender";
import type Marked from "marked-react";
import createBlock from "../writes/createBlock";

type Props = {
  content: string;
  onConfirm?: () => void;
  confirmText?: string;
  onCancel?: (() => void) | true;
  externalLink?: boolean;
  dontShowAgain?: string;
};

const SimpleAlert =
  (Markdown: typeof Marked) =>
  ({
    onClose,
    content,
    onConfirm,
    onCancel,
    externalLink,
    confirmText = "Ok",
    dontShowAgain,
  }: Props & { onClose: () => void }): React.ReactElement => {
    const alertOnClose = useCallback(
      (confirmed: boolean) => {
        onClose();
        if (!confirmed && typeof onCancel === "function") onCancel();
      },
      [onCancel, onClose]
    );
    const cancelProps = onCancel
      ? {
          cancelButtonText: "Cancel",
          canOutsideClickCancel: true,
          canEscapeKeyCancel: true,
        }
      : {};
    const [checked, setChecked] = useState(false);
    const alerOnConfirm = useCallback(() => {
      (checked && dontShowAgain
        ? createBlock({
            parentUid: dontShowAgain,
            node: { text: "Do not show again" },
          })
        : Promise.resolve()
      ).then(onConfirm);
    }, [onConfirm, checked, dontShowAgain]);
    return (
      <Alert
        isOpen={true}
        onClose={alertOnClose}
        onConfirm={alerOnConfirm}
        confirmButtonText={confirmText}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        autoFocus={false}
        {...cancelProps}
      >
        <div
          className={Classes.ALERT_CONTENTS}
          style={{ whiteSpace: "pre-wrap" }}
        >
          <Markdown
            renderer={
              externalLink
                ? {
                    link: (href, text) => (
                      <a href={href} rel={"noreferrer"} target={"_blank"}>
                        {text}
                      </a>
                    ),
                  }
                : {}
            }
          >
            {content}
          </Markdown>
          {dontShowAgain && (
            <Checkbox
              checked={checked}
              label="Don't show again"
              onChange={(e) =>
                setChecked((e.target as HTMLInputElement).checked)
              }
            />
          )}
        </div>
      </Alert>
    );
  };

export const render = (props: Props) =>
  (window.RoamLazy
    ? window.RoamLazy.MarkedReact()
    : import("marked-react").then((r) => r.default)
  ).then((Markdown) =>
    createOverlayRender<Props>("simple-alert", SimpleAlert(Markdown))(props)
  );

export default SimpleAlert;
