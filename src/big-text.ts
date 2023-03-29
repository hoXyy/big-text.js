/*
Brorlandi/big-text.js v1.0.0, 2017
Adapted from DanielHoffmann/jquery-bigtext, v1.3.0, May 2014
And from Jetroid/bigtext.js v1.0.0, September 2016

Usage:
BigText("#myElement",{
	rotateText: {Number}, (null)
	fontSizeFactor: {Number}, (0.8)
	maximumFontSize: {Number}, (null)
	limitingDimension: {String}, ("both")
	horizontalAlign: {String}, ("center")
	verticalAlign: {String}, ("center")
	textAlign: {String}, ("center")
	whiteSpace: {String}, ("nowrap")
});


Original Projects: 
https://github.com/DanielHoffmann/jquery-bigtext
https://github.com/Jetroid/bigtext.js

Options:

rotateText: Rotates the text inside the element by X degrees.

fontSizeFactor: This option is used to give some vertical spacing for letters that overflow the line-height (like 'g', 'Á' and most other accentuated uppercase letters). This does not affect the font-size if the limiting factor is the width of the parent div. The default is 0.8

maximumFontSize: maximum font size to use.

limitingDimension: In which dimension the font size should be limited. Possible values: "width", "height" or "both". Defaults to both. Using this option with values different than "both" overwrites the element parent width or height.

horizontalAlign: Where to align the text horizontally. Possible values: "left", "center", "right". Defaults to "center".

verticalAlign: Where to align the text vertically. Possible values: "top", "center", "bottom". Defaults to "center".

textAlign: Sets the text align of the element. Possible values: "left", "center", "right". Defaults to "center". This option is only useful if there are linebreaks (<br> tags) inside the text.

whiteSpace: Sets whitespace handling. Possible values: "nowrap", "pre". Defaults to "nowrap". (Can also be set to enable wrapping but this doesn't work well.)

Bruno Orlandi - 2017

Copyright (C) 2013 Daniel Hoffmann Bernardes, Ícaro Technologies
Copyright (C) 2016 Jet Holt

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

interface UserOptions {
  /** Rotates the text inside the element by X degrees. */
  rotateText?: number;
  /** This option is used to give some vertical spacing for letters that overflow the line-height (like 'g', 'Á' and most other accentuated uppercase letters). This does not affect the font-size if the limiting factor is the width of the parent div. The default is 0.8. */
  fontSizeFactor?: number;
  /** Maximum font size to use. */
  maximumFontSize?: number;
  /** In which dimension the font size should be limited. Defaults to "both". Using this option with values different than "both" overwrites the element parent width or height. */
  limitingDimension?: "width" | "height" | "both";
  /** Where to align the text horizontally. Defaults to "center". */
  horizontalAlign?: "left" | "center" | "right";
  /** Where to align the text vertically. Defaults to "center". */
  verticalAlign?: "top" | "center" | "bottom";
  /** Sets the text align of the element. Defaults to "center". This option is only useful if there are linebreaks inside the text. */
  textAlign?: "left" | "center" | "right";
  /** Sets whitespace handling. Defaults to "nowrap". (Can also be set to enable wrapping but this doesn't work well.) */
  whiteSpace?: "nowrap" | "pre";
}

interface Options {
  /** Rotates the text inside the element by X degrees. */
  rotateText: number | null;
  /** This option is used to give some vertical spacing for letters that overflow the line-height (like 'g', 'Á' and most other accentuated uppercase letters). This does not affect the font-size if the limiting factor is the width of the parent div. The default is 0.8. */
  fontSizeFactor: number;
  /** Maximum font size to use. */
  maximumFontSize: number | null;
  /** In which dimension the font size should be limited. Defaults to "both". Using this option with values different than "both" overwrites the element parent width or height. */
  limitingDimension: "width" | "height" | "both";
  /** Where to align the text horizontally. Defaults to "center". */
  horizontalAlign: "left" | "center" | "right";
  /** Where to align the text vertically. Defaults to "center". */
  verticalAlign: "top" | "center" | "bottom";
  /** Sets the text align of the element. Defaults to "center". This option is only useful if there are linebreaks inside the text. */
  textAlign: "left" | "center" | "right";
  /** Sets whitespace handling. Defaults to "nowrap". (Can also be set to enable wrapping but this doesn't work well.) */
  whiteSpace: "nowrap" | "pre";
}

function _calculateInnerDimensions(computedStyle: CSSStyleDeclaration) {
  //Calculate the inner width and height
  let innerWidth;
  let innerHeight;

  const width = parseInt(computedStyle.getPropertyValue("width"));
  const height = parseInt(computedStyle.getPropertyValue("height"));
  const paddingLeft = parseInt(computedStyle.getPropertyValue("padding-left"));
  const paddingRight = parseInt(computedStyle.getPropertyValue("padding-right"));
  const paddingTop = parseInt(computedStyle.getPropertyValue("padding-top"));
  const paddingBottom = parseInt(
    computedStyle.getPropertyValue("padding-bottom")
  );
  const borderLeft = parseInt(
    computedStyle.getPropertyValue("border-left-width")
  );
  const borderRight = parseInt(
    computedStyle.getPropertyValue("border-right-width")
  );
  const borderTop = parseInt(computedStyle.getPropertyValue("border-top-width"));
  const borderBottom = parseInt(
    computedStyle.getPropertyValue("border-bottom-width")
  );

  //If box-sizing is border-box, we need to subtract padding and border.
  const parentBoxSizing = computedStyle.getPropertyValue("box-sizing");
  if (parentBoxSizing == "border-box") {
    innerWidth =
      width - (paddingLeft + paddingRight + borderLeft + borderRight);
    innerHeight =
      height - (paddingTop + paddingBottom + borderTop + borderBottom);
  } else {
    innerWidth = width;
    innerHeight = height;
  }
  const obj = { width: 0, height: 0 };
  obj["width"] = innerWidth;
  obj["height"] = innerHeight;
  return obj;
}

export default function BigText(element: HTMLElement, options?: UserOptions) {
  const defaultOptions: Options = {
    rotateText: null,
    fontSizeFactor: 0.8,
    maximumFontSize: null,
    limitingDimension: "both",
    horizontalAlign: "center",
    verticalAlign: "center",
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  //Merge provided options and default options
  const bigTextOptions = { ...defaultOptions, ...options };

  //Get variables which we will reference frequently
  const style = element.style;
  const computedStyle = document.defaultView!.getComputedStyle(element);
  const parent = element.parentElement!;
  const parentStyle = parent.style;
  const parentComputedStyle = document.defaultView!.getComputedStyle(parent);

  //hides the element to prevent "flashing"
  style.visibility = "hidden";

  //Set some properties
  style.display = "inline-block";
  style.clear = "both";
  style.float = "left";
  style.fontSize = 1000 * bigTextOptions.fontSizeFactor + "px";
  style.lineHeight = "1000px";
  style.whiteSpace = bigTextOptions.whiteSpace;
  style.textAlign = bigTextOptions.textAlign;
  style.position = "relative";
  style.padding = "0";
  style.margin = "0";
  style.left = "50%";
  style.top = "50%";

  //Get properties of parent to allow easier referencing later.
  const parentPadding = {
    top: parseInt(parentComputedStyle.getPropertyValue("padding-top")),
    right: parseInt(parentComputedStyle.getPropertyValue("padding-right")),
    bottom: parseInt(parentComputedStyle.getPropertyValue("padding-bottom")),
    left: parseInt(parentComputedStyle.getPropertyValue("padding-left")),
  };
  const parentBorder = {
    top: parseInt(parentComputedStyle.getPropertyValue("border-top")),
    right: parseInt(parentComputedStyle.getPropertyValue("border-right")),
    bottom: parseInt(parentComputedStyle.getPropertyValue("border-bottom")),
    left: parseInt(parentComputedStyle.getPropertyValue("border-left")),
  };

  //Calculate the parent inner width and height
  const parentInnerDimensions = _calculateInnerDimensions(parentComputedStyle);
  const parentInnerWidth = parentInnerDimensions["width"];
  const parentInnerHeight = parentInnerDimensions["height"];

  const box = {
    width: element.offsetWidth, //Note: This is slightly larger than the jQuery version
    height: element.offsetHeight,
  };

  if (bigTextOptions.rotateText !== null) {
    if (typeof bigTextOptions.rotateText !== "number")
      throw "bigText error: rotateText value must be a number";
    const rotate = "rotate(" + bigTextOptions.rotateText + "deg)";
    style.transform = rotate;
    //calculating bounding box of the rotated element
    const sine = Math.abs(
      Math.sin((bigTextOptions.rotateText * Math.PI) / 180)
    );
    const cosine = Math.abs(
      Math.cos((bigTextOptions.rotateText * Math.PI) / 180)
    );
    box.width = element.offsetWidth * cosine + element.offsetHeight * sine;
    box.height = element.offsetWidth * sine + element.offsetHeight * cosine;
  }

  const widthFactor =
    (parentInnerWidth - parentPadding.left - parentPadding.right) / box.width;
  const heightFactor =
    (parentInnerHeight - parentPadding.top - parentPadding.bottom) / box.height;
  let lineHeight;

  if (bigTextOptions.limitingDimension.toLowerCase() === "width") {
    lineHeight = Math.floor(widthFactor * 1000);
    parentStyle.height = lineHeight + "px";
  } else if (bigTextOptions.limitingDimension.toLowerCase() === "height") {
    lineHeight = Math.floor(heightFactor * 1000);
  } else if (widthFactor < heightFactor)
    lineHeight = Math.floor(widthFactor * 1000);
  else if (widthFactor >= heightFactor)
    lineHeight = Math.floor(heightFactor * 1000);
  else lineHeight = Math.floor(heightFactor * 1000);

  let fontSize = lineHeight * bigTextOptions.fontSizeFactor;
  if (
    bigTextOptions.maximumFontSize !== null &&
    fontSize > bigTextOptions.maximumFontSize
  ) {
    fontSize = bigTextOptions.maximumFontSize;
    lineHeight = fontSize / bigTextOptions.fontSizeFactor;
  }

  style.fontSize = Math.floor(fontSize) + "px";
  style.lineHeight = Math.ceil(lineHeight) + "px";
  style.marginBottom = "0px";
  style.marginRight = "0px";

  if (bigTextOptions.limitingDimension.toLowerCase() === "height") {
    //this option needs the font-size to be set already so computedStyle.getPropertyValue("width") returns the right size
    //this +4 is to compensate the rounding erros that can occur due to the calls to Math.floor in the centering code
    parentStyle.width =
      parseInt(computedStyle.getPropertyValue("width")) + 4 + "px";
  }

  //Calculate the inner width and height
  const innerDimensions = _calculateInnerDimensions(computedStyle);
  const innerWidth = innerDimensions["width"];
  const innerHeight = innerDimensions["height"];

  switch (bigTextOptions.verticalAlign.toLowerCase()) {
    case "top":
      style.top = "0%";
      break;
    case "bottom":
      style.top = "100%";
      style.marginTop = Math.floor(-innerHeight) + "px";
      break;
    default:
      style.marginTop = Math.floor(-innerHeight / 2) + "px";
      break;
  }

  switch (bigTextOptions.horizontalAlign.toLowerCase()) {
    case "left":
      style.left = "0%";
      break;
    case "right":
      style.left = "100%";
      style.marginLeft = Math.floor(-innerWidth) + "px";
      break;
    default:
      style.marginLeft = Math.floor(-innerWidth / 2) + "px";
      break;
  }

  //shows the element after the work is done
  style.visibility = "visible";

  return element;
}
