import React, { ReactElement } from "react";

import DemoPage from "../DemoPage";

import CrossFadeExamples from "./CrossFadeExamples";
import crossFadeExamples from "./CrossFadeExamples.md";

import CrossFadeHookExample from "./CrossFadeHookExample";
import crossFadeHookExample from "./CrossFadeHookExample.md";

import SimpleCollapseExample from "./SimpleCollapseExample";
import simpleCollapseExamples from "./SimpleCollapseExample.md";

import ConfigurableCollapseExample from "./ConfigurableCollapseExample";
import configurableCollapseExample from "./ConfigurableCollapseExample.md";

import ScaleTransitionExample from "./ScaleTransitionExample";
import scaleTransitionExample from "./ScaleTransitionExample.md";

import CustomCSSTransition from "./CustomCSSTransition";
import customCSSTransition from "./CustomCSSTransition.md";

import FixedPositioningExample from "./FixedPositioningExample";
import fixedPositioningExample from "./FixedPositioningExample.md";

const demos = [
  {
    name: "Cross Fade Examples",
    description: crossFadeExamples,
    children: <CrossFadeExamples />,
    disableCard: true,
  },
  {
    name: "Cross Fade Hook Example",
    description: crossFadeHookExample,
    children: <CrossFadeHookExample />,
    disableCard: true,
  },
  {
    name: "Simple Collapse Example",
    description: simpleCollapseExamples,
    children: <SimpleCollapseExample />,
  },
  {
    name: "Configurable Collapse Example",
    description: configurableCollapseExample,
    children: <ConfigurableCollapseExample />,
    disableCard: true,
  },
  {
    name: "Scale Transition Example",
    description: scaleTransitionExample,
    children: <ScaleTransitionExample />,
  },
  {
    name: "Custom CSSTransition",
    description: customCSSTransition,
    children: <CustomCSSTransition />,
  },
  {
    name: "Fixed Positioning Example",
    description: fixedPositioningExample,
    children: <FixedPositioningExample />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="transition" />
);
