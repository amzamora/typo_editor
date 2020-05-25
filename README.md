# Notebooks editor

Created to have completely freedom for my app [Notebooks](https://github.com/amzamora/notebooks).

## How to use it

You createad and HTML file with a pre element with and id. Then you pass that id when instantiating
TypoEditor.

Then you can use the following methods:

- `setText(text)        // Receives a string`
- `setFontSize(number)  // Receives size in pixels`
- `insertAtCursor(text) // Receives a string`

## How does it work

The TypoEditor class is on the file editor.js.

The constructor job is to attach events to the editor to handle
input.

The parser is used when setText method invoked. It receives somo text and
the editor element. It convert the text into writedown elements and
puts them on the editor.

The element class is the base behaviour for manipulation for most writedown elements.

## To do

### Cursor navigation
- [ ] Add clickling as a way to move the cursor
- [x] Add up arrow and down arrow as ways to move the cursor

### Elements
- [ ] Lists
- [ ] Blockquotes
- [ ] Code
- [ ] Inline elements

### Edition
- [ ] Selection
  - [ ] Deletion
  - [ ] Copy
- [ ] Undo, Redo
- [ ] Image insertion
