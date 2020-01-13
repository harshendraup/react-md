import React, { FC, forwardRef, HTMLAttributes, useMemo } from "react";
import cn from "classnames";
import { bem, WithForwardedRef } from "@react-md/utils";

import { TableConfigProvider, useTableConfig, TableCellConfig } from "./config";
import { StickyTableProvider } from "./sticky";

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement>,
    Pick<TableCellConfig, "lineWrap"> {
  /**
   * This is a rename of the `disableHover` of the `TableConfig` since table
   * headers are not hoverable by default. This prop can be enabled to add the
   * row hover color within table headers, but it is not really recommended.
   */
  hoverable?: boolean;

  /**
   * Boolean if the header should be rendered as a sticky header that will
   * cover the table contents as the page or `TableContainer` is scrolled.
   */
  sticky?: boolean;
}

type WithRef = WithForwardedRef<HTMLTableSectionElement>;
type DefaultProps = Required<Pick<TableHeaderProps, "hoverable" | "sticky">>;
type WithDefaultProps = TableHeaderProps & DefaultProps & WithRef;

const block = bem("rmd-thead");

/**
 * Creates a `<thead>` element with some basic styles. This component will also
 * update the table configuration so that all the `TableCell` children will
 * automatically become `<th>` elements instead of the normal `<td>` as well as
 * disabling the hover effect and line wrapping. The hover effect and
 * line-wrapping can be re-enabled if desired through the `hoverable` and
 * `disableNoWrap` props.
 */
const TableHeader: FC<TableHeaderProps & WithRef> = providedProps => {
  const {
    className,
    forwardedRef,
    hoverable,
    lineWrap: propLineWrap,
    children,
    sticky,
    ...props
  } = providedProps as WithDefaultProps;

  // update the table configuration with the custom overrides for the `<thead>`
  const {
    hAlign,
    vAlign,
    lineWrap,
    disableHover,
    disableBorders,
  } = useTableConfig({
    lineWrap: propLineWrap,
    disableHover: !hoverable,
  });

  const configuration = useMemo(
    () => ({
      header: true,
      hAlign,
      vAlign,
      lineWrap,
      disableBorders,
      disableHover,
    }),
    [hAlign, vAlign, lineWrap, disableBorders, disableHover]
  );

  return (
    <TableConfigProvider value={configuration}>
      <thead {...props} ref={forwardedRef} className={cn(block(), className)}>
        <StickyTableProvider value={sticky}>{children}</StickyTableProvider>
      </thead>
    </TableConfigProvider>
  );
};

const defaultProps: DefaultProps = {
  hoverable: false,
  sticky: false,
};

TableHeader.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TableHeader.displayName = "TableHeader";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TableHeader.propTypes = {
      className: PropTypes.string,
      lineWrap: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["padded"]),
      ]),
      hoverable: PropTypes.bool,
      sticky: PropTypes.bool,
    };
  }
}

export default forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  (props, ref) => <TableHeader {...props} forwardedRef={ref} />
);
