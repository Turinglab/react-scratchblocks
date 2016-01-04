#React Scratchblocks

React Scratchbocks is a rewrie of the popular [http://github.com/blob8108/scratchblocks2](scratchblocks2) library written by Tim Radvan. Most of the code is taken from the origional however this version uses ReactJS as the view component as opposed to jQuery.

#Installation

This repository is stored on NPM to allow it be easily included in existing React projects. Install using the following command.

```
npm install react-scratchblocks --save
``` 

#Usage

To use this component in a React application it needs to be imported.

```javascript
import Scratchblocks from 'react-scratchblocks'
```

Then Scratch codeblocks can be used within React application using the following tag.

```html
<Scratchblocks code="say [hello]" />
```

In addition to the `code` prop an optional boolean prop `inline` can be used to specify inline Scratch blocks

#Licence

MIT
http://opensource.org/licenses/MIT