/** this file is generated from `yarn dev-utils sassdoc` and should not be updated manually */
import { PackageSassDoc } from "utils/sassdoc";

const sassdoc: PackageSassDoc = {
  functions: {
    "rmd-chip-theme": {
      name: "rmd-chip-theme",
      description:
        "This function is used to quickly get one of the chip's theme values. This is really\njust for the `rmd-chip-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/chip/src/_functions.scss#L14-L16",
      packageName: "chip",
      code: "@function rmd-chip-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-chip-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-chip-theme-values, chip);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-chip-theme-values` map keys to get a value for.",
        },
      ],
      returns: {
        type: "Color|String|Number",
        description: "one of the chip's theme values.",
      },
    },
    "rmd-chip-theme-var": {
      name: "rmd-chip-theme-var",
      description:
        "This function is used to get one of the chip's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-chip-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/chip/src/_functions.scss#L29-L31",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      packageName: "chip",
      code: "@function rmd-chip-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-chip-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-chip-theme-values, chip, $fallback);\n}",
      type: "function",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-chip-theme-values` map keys to set a value for.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
        },
      ],
      returns: {
        type: "String",
        description: "one of the chip's theme values as a css variable.",
      },
    },
  },
  mixins: {
    "rmd-chip-theme": {
      name: "rmd-chip-theme",
      description:
        "This function is used to quickly get one of the chip's theme values. This is really\njust for the `rmd-chip-theme` mixin to provide some validation that a correct style\nkey is used, but might be useful in other cases.\n\n",
      source: "packages/chip/src/_functions.scss#L14-L16",
      packageName: "chip",
      code: "@function rmd-chip-theme($theme-style) { … }",
      sourceCode:
        "@function rmd-chip-theme($theme-style) {\n  @return rmd-theme-get-var-value($theme-style, $rmd-chip-theme-values, chip);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-chip-theme-values` map keys to get a value for.",
        },
      ],
    },
    "rmd-chip-theme-var": {
      name: "rmd-chip-theme-var",
      description:
        "This function is used to get one of the chip's theme variables as a CSS Variable\nto be applied as a style attribute. By default, the CSS Variable will have a fallback\nof the current `$rmd-chip-theme-values`\n\nThis function is used to create a CSS Variable declaration with an optional fallback value\nif the CSS Variable has not been declared somehow.\n\n",
      source: "packages/chip/src/_functions.scss#L29-L31",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      packageName: "chip",
      code: "@function rmd-chip-theme-var($theme-style\n$fallback: null) { … }",
      sourceCode:
        "@function rmd-chip-theme-var($theme-style\n$fallback: null) {\n  @return rmd-theme-get-var($theme-style, $rmd-chip-theme-values, chip, $fallback);\n}",
      type: "mixin",
      parameters: [
        {
          type: "String",
          name: "theme-style",
          description:
            "One of the `$rmd-chip-theme-values` map keys to set a value for.",
        },
        {
          type: "Color|String|Number",
          name: "fallback",
          default: "null",
          description:
            "An optional fallback color to apply. This is set to `null` by\ndefault and not used since the link's theme variables should always exist.",
        },
      ],
    },
  },
  variables: {
    "rmd-chip-height": {
      name: "rmd-chip-height",
      description: "The height for chips.\n",
      source: "packages/chip/src/_variables.scss#L9",
      packageName: "chip",
      type: "Number",
      value: "2rem",
      overridable: true,
    },
    "rmd-chip-border-radius": {
      name: "rmd-chip-border-radius",
      description: "The border radius to use for all chip types.\n",
      source: "packages/chip/src/_variables.scss#L13",
      packageName: "chip",
      type: "Number",
      value: "1rem",
      overridable: true,
    },
    "rmd-chip-solid-light-background-color": {
      name: "rmd-chip-solid-light-background-color",
      description:
        'The background color to use for "solid" themed chips when using the light\ntheme.\n',
      source: "packages/chip/src/_variables.scss#L18",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value: "$rmd-grey-300",
      compiled: "#e0e0e0",
      overridable: true,
    },
    "rmd-chip-solid-light-color": {
      name: "rmd-chip-solid-light-color",
      description:
        'The text color to use for "solid" themed chips when using the light theme.\n',
      source: "packages/chip/src/_variables.scss#L22-L26",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-chip-solid-light-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-chip-solid-dark-background-color": {
      name: "rmd-chip-solid-dark-background-color",
      description:
        'The background color to use for "solid" themed chips when using the dark\ntheme.\n',
      source: "packages/chip/src/_variables.scss#L31",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "chip",
      type: "Color",
      value: "$rmd-grey-900",
      compiled: "#212121",
      overridable: true,
    },
    "rmd-chip-solid-dark-color": {
      name: "rmd-chip-solid-dark-color",
      description:
        'The text color to use for "solid" themed chips when using the dark theme.\n',
      source: "packages/chip/src/_variables.scss#L35-L39",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-chip-solid-dark-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-chip-solid-background-color": {
      name: "rmd-chip-solid-background-color",
      description: 'The background color to use for "solid" themed chips.\n',
      source: "packages/chip/src/_variables.scss#L43-L47",
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-chip-solid-light-background-color,\n  $rmd-chip-solid-dark-background-color\n)",
      compiled: "#e0e0e0",
      overridable: true,
    },
    "rmd-chip-solid-color": {
      name: "rmd-chip-solid-color",
      description: 'The text color to use for "solid" themed chips.\n',
      source: "packages/chip/src/_variables.scss#L51-L55",
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-chip-solid-light-color,\n  $rmd-chip-solid-dark-color\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-chip-outline-light-background-color": {
      name: "rmd-chip-outline-light-background-color",
      description:
        'The background color to use for "outlined" themed chips when using\nthe light theme.\n',
      source: "packages/chip/src/_variables.scss#L60",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value: "$rmd-theme-light-surface",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-chip-outline-light-color": {
      name: "rmd-chip-outline-light-color",
      description:
        'The text color to use for "outlined" themed chips when using the\nlight theme.\n',
      source: "packages/chip/src/_variables.scss#L65-L69",
      usedBy: [
        { name: "rmd-theme-light", type: "mixin", packageName: "theme" },
      ],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-chip-outline-light-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-chip-outline-dark-background-color": {
      name: "rmd-chip-outline-dark-background-color",
      description:
        'The background color to use for "outlined" themed chips when using\nthe dark theme.\n',
      source: "packages/chip/src/_variables.scss#L74",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "chip",
      type: "Color",
      value: "$rmd-theme-dark-surface",
      compiled: "#424242",
      overridable: true,
    },
    "rmd-chip-outline-dark-color": {
      name: "rmd-chip-outline-dark-color",
      description:
        'The text color to use for "outlined" themed chips when using the\ndark theme.\n',
      source: "packages/chip/src/_variables.scss#L79-L83",
      usedBy: [{ name: "rmd-theme-dark", type: "mixin", packageName: "theme" }],
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  rmd-theme-tone($rmd-chip-outline-dark-background-color) == light,\n  $rmd-black-base,\n  $rmd-white-base\n)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-chip-outline-background-color": {
      name: "rmd-chip-outline-background-color",
      description: 'The background color to use for "outlined" themed chips.\n',
      source: "packages/chip/src/_variables.scss#L87-L91",
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-chip-outline-light-background-color,\n  $rmd-chip-outline-dark-background-color\n)",
      compiled: "#fff",
      overridable: true,
    },
    "rmd-chip-outline-color": {
      name: "rmd-chip-outline-color",
      description: 'The tect color to use for "outlined" themed chips.\n',
      source: "packages/chip/src/_variables.scss#L95-L99",
      packageName: "chip",
      type: "Color",
      value:
        "if(\n  $rmd-theme-light,\n  $rmd-chip-outline-light-color,\n  $rmd-chip-outline-dark-color\n)",
      compiled: "#000",
      overridable: true,
    },
    "rmd-chip-outline-border-color": {
      name: "rmd-chip-outline-border-color",
      description: 'The border color to use for "outline" themed chips.\n',
      source: "packages/chip/src/_variables.scss#L103",
      packageName: "chip",
      type: "Color",
      value: "$rmd-grey-300",
      compiled: "#e0e0e0",
      overridable: true,
    },
    "rmd-chip-small-spacing": {
      name: "rmd-chip-small-spacing",
      description:
        "The amount of spacing to use when between the left edge and the\nleading icon/avatar in the chip.\n",
      source: "packages/chip/src/_variables.scss#L108",
      packageName: "chip",
      type: "Number",
      value: "0.25rem",
      overridable: true,
    },
    "rmd-chip-medium-spacing": {
      name: "rmd-chip-medium-spacing",
      description:
        "The amount of spacing to use between the leading icon/avatar and\nthe chip's text as well as the trailing icon and the chip's edge.\n",
      source: "packages/chip/src/_variables.scss#L113",
      packageName: "chip",
      type: "Number",
      value: "0.5rem",
      overridable: true,
    },
    "rmd-chip-large-spacing": {
      name: "rmd-chip-large-spacing",
      description:
        "The amount of spacing to use for the chip's edge when there are no\nleading or trailing icons/avatars.\n",
      source: "packages/chip/src/_variables.scss#L118",
      packageName: "chip",
      type: "Number",
      value: "0.75rem",
      overridable: true,
    },
    "rmd-chip-icon-size": {
      name: "rmd-chip-icon-size",
      description: "The size to update icons to that appear within a chip.\n",
      source: "packages/chip/src/_variables.scss#L122",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      packageName: "chip",
      type: "Number",
      value: "1.125rem",
      overridable: true,
    },
    "rmd-chip-box-shadow": {
      name: "rmd-chip-box-shadow",
      description:
        "The base box-shadow to apply to chips when outlined. This will normally be used along with a color variable\nto define a box shadow.\n",
      source: "packages/chip/src/_variables.scss#L127",
      usedBy: [{ name: "rmd-chip", type: "mixin", packageName: "chip" }],
      packageName: "chip",
      type: "String",
      value: "inset 0 0 0 1px",
      overridable: true,
    },
    "rmd-chip-theme-values": {
      name: "rmd-chip-theme-values",
      description:
        'A Map of all the "themeable" parts of the chip package. Every key in this map will\nbe used to create a css variable to dynamically update the values of the icon as\nneeded.\n',
      source: "packages/chip/src/_variables.scss#L133-L144",
      usedBy: [
        { name: "rmd-chip-theme", type: "function", packageName: "chip" },
        { name: "rmd-chip-theme-var", type: "function", packageName: "chip" },
        { name: "rmd-chip-theme", type: "mixin", packageName: "chip" },
        {
          name: "rmd-chip-theme-update-var",
          type: "mixin",
          packageName: "chip",
        },
        { name: "react-md-chip", type: "mixin", packageName: "chip" },
      ],
      packageName: "chip",
      type: "Map",
      value:
        "(\n  height: $rmd-chip-height,\n  border-radius: $rmd-chip-border-radius,\n  solid-background-color: $rmd-chip-solid-background-color,\n  solid-color: $rmd-chip-solid-color,\n  outline-background-color: $rmd-chip-outline-background-color,\n  outline-color: $rmd-chip-outline-color,\n  outline-border-color: $rmd-chip-outline-border-color,\n  small-spacing: $rmd-chip-small-spacing,\n  medium-spacing: $rmd-chip-medium-spacing,\n  large-spacing: $rmd-chip-large-spacing,\n)",
      compiled:
        "(\n  height: 2rem,\n  border-radius: 1rem,\n  solid-background-color: #e0e0e0,\n  solid-color: #000,\n  outline-background-color: #fff,\n  outline-color: #000,\n  outline-border-color: #e0e0e0,\n  small-spacing: 0.25rem,\n  medium-spacing: 0.5rem,\n  large-spacing: 0.75rem,\n)",
      overridable: true,
    },
  },
};

export default sassdoc;