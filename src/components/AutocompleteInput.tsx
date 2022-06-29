import {
  InputGroup,
  Menu,
  MenuItem,
  PopoverPosition,
  Popover,
  Button,
} from "@blueprintjs/core";
import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import useArrowKeyDown from "../hooks/useArrowKeyDown";
import fuzzy from "fuzzy";

const AutocompleteInput = ({
  value,
  setValue,
  onBlur,
  onConfirm,
  showButton,
  options = [],
  placeholder = "Enter value",
}: {
  value: string;
  setValue: (q: string) => void;
  showButton?: boolean;
  onBlur?: (v: string) => void;
  onConfirm?: () => void;
  options?: string[];
  placeholder?: string;
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  const [isTyping, setIsTyping] = useState(false);
  const items = useMemo(
    () =>
      value
        ? fuzzy
            .filter(value, options)
            .slice(0, 9)
            .map((e) => e.string)
        : [],
    [value, options]
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const onEnter = useCallback(
    (value) => {
      if (isOpen) {
        setValue(value);
        setIsTyping(false);
      } else if (onConfirm) {
        onConfirm();
      } else {
        setIsOpen(true);
      }
    },
    [setValue, close, onConfirm, isOpen]
  );
  const { activeIndex, onKeyDown } = useArrowKeyDown({
    onEnter,
    results: items,
  });
  useEffect(() => {
    if (!items.length || !isTyping) close();
    else open();
  }, [items, close, open, isTyping]);
  return (
    <Popover
      portalClassName={"roamjs-autocomplete-input"}
      targetClassName={"roamjs-autocomplete-input-target"}
      captureDismiss={true}
      isOpen={isOpen}
      onOpened={open}
      minimal
      autoFocus={false}
      enforceFocus={false}
      position={PopoverPosition.BOTTOM_LEFT}
      modifiers={{
        flip: { enabled: false },
        preventOverflow: { enabled: false },
      }}
      content={
        <Menu style={{ maxWidth: 400 }}>
          {items.map((t, i) => (
            <MenuItem
              text={t}
              active={activeIndex === i}
              key={i}
              multiline
              onClick={() => {
                setIsTyping(false);
                setValue(items[i]);
                inputRef.current?.focus();
              }}
            />
          ))}
        </Menu>
      }
      target={
        <InputGroup
          value={value || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsTyping(true);
            setValue(e.target.value);
          }}
          placeholder={placeholder}
          autoFocus={true}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              close();
            } else {
              onKeyDown(e);
            }
          }}
          onClick={() => setIsTyping(true)}
          onBlur={(e) => {
            setIsTyping(false);
            if (
              e.relatedTarget &&
              !(e.relatedTarget as HTMLElement).closest?.(
                ".roamjs-autocomplete-input"
              )
            ) {
              close();
            }
            if (onBlur) {
              onBlur(e.target.value);
            }
          }}
          inputRef={inputRef}
          {...(showButton
            ? {
                rightElement: <Button icon={"add"} minimal onClick={onEnter} />,
              }
            : {})}
        />
      }
    />
  );
};

export default AutocompleteInput;
