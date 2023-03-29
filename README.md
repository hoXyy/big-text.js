# big-text.ts

A JavaScript lib that makes text as big as possible while still fitting on the parent element. Based on DanielHoffmann/jquery-bigtext. Ported to TypeScript by hoXyy.

## Installation

	npm install --save big-text.ts

## Usage

```javascript
import BigText from 'big-text.ts';

BigText("#span",{
	rotateText: {Number}, (null)
	fontSizeFactor: {Number}, (0.8)
	maximumFontSize: {Number}, (null)
	limitingDimension: {String}, ("both")
	horizontalAlign: {String}, ("center")
	verticalAlign: {String}, ("center")
	textAlign: {String}, ("center")
	whiteSpace: {String}, ("nowrap")
});
```

## Options

**rotateText**: Rotates the text inside the element by X degrees.

**fontSizeFactor**: This option is used to give some vertical spacing for letters that overflow the line-height (like 'g', 'Á' and most other accentuated uppercase letters). This does not affect the font-size if the limiting factor is the width of the parent div. The default is 0.8

**maximumFontSize**: maximum font size to use.

**limitingDimension**: In which dimension the font size should be limited. Possible values: "width", "height" or "both". Defaults to both. Using this option with values different than "both" overwrites the element parent width or height.

**horizontalAlign**: Where to align the text horizontally. Possible values: "left", "center", "right". Defaults to "center".

**verticalAlign**: Where to align the text vertically. Possible values: "top", "center", "bottom". Defaults to "center".

**textAlign**: Sets the text align of the element. Possible values: "left", "center", "right". Defaults to "center". This option is only useful if there are linebreaks (`<br>` tags) inside the text.

**whiteSpace**: Sets whitespace handling. Possible values: "nowrap", "pre". Defaults to "nowrap". (Can also be set to enable wrapping but this doesn't work well.)


## Examples

```html
<div style="width: 300px, height: 200px">
  <span id="span">BigText</span>
</div>
```
```javascript
BigText("#span");
```

With one simple line the text "BigText" will now have its font-size increased but without overflowing the element parent div.

See more examples in https://brorlandi.github.io/big-text.js/

## Browser Compatibility
 - Internet Explorer 9 or higher (might work on older versions)
 - Opera
 - Firefox
 - Google Chrome
 - Safari

## License
This project is released under the MIT license.
