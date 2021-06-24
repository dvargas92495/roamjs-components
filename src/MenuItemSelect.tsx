import { Button, IButtonProps, MenuItem } from "@blueprintjs/core";
import { SelectProps, Select } from "@blueprintjs/select";
import React, { ReactText } from "react";

const MenuItemSelect = <T extends ReactText>(
  props: Omit<SelectProps<T>, "itemRenderer"> & {
    ButtonProps?: IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
  } & { emptyValueText?: string }
): JSX.Element => {
  const TypeSelect = Select.ofType<T>();
  return (
    <TypeSelect
      {...props}
      itemRenderer={(item, { modifiers, handleClick }) => (
        <MenuItem
          key={item}
          text={item}
          active={modifiers.active}
          onClick={handleClick}
        />
      )}
      filterable={false}
      popoverProps={{
        minimal: true,
        captureDismiss: true,
        ...props.popoverProps,
      }}
    >
      <Button
        {...props.ButtonProps}
        text={
          props.activeItem || (
            <i style={{ opacity: 0.5 }}>
              {props.emptyValueText || "Choose..."}
            </i>
          )
        }
        rightIcon="double-caret-vertical"
      />
    </TypeSelect>
  );
};

export default MenuItemSelect;
