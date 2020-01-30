class Parser {
	/* Public
	   ====== */

	static stylize(text) {
		let stylized = "";
		let index = {
			pos: 0
		};
		while (index.pos < text.length) {
			stylized += this._nextElement(text, index);
		}

		stylized = this._inline_stylize(stylized);

		return stylized;
	}

	// This function is encharged to ensure that there is two new lines between block elements.
	static format(text) {
		let index = {
			pos: 0
		}
		let formatted = '';

		while (index.pos < text.length) {
			// Header
			if (this._isHeader(text, index)) {
				while (index.pos < text.length) {
					if (text[index.pos] === '\n') {
						break;
					}
					formatted += text[index.pos];
					index.pos += 1;
				}
				if (index.pos < text.length) {
					formatted += text[index.pos];
					index.pos += 1;
					if (text[index.pos] !== '\n') {
						formatted += '\n';
					}
				}

			// Paragraph
			} else {
				while (index.pos < text.length) {
					if (text[index.pos] === '\n' && this._isNewElement(text, index)) {
						break;
					}
					if (text[index.pos] !== '\n') {
						formatted += text[index.pos];
					}
					index.pos += 1;
				}
				if (index.pos < text.length) {
					formatted += text[index.pos];
					index.pos += 1;
					if (text[index.pos] !== '\n') {
						formatted += '\n';
					}
				}
			}
		}

		return formatted;
	}

	static insert(buffer, cursor, char) {
		if (char === '\n') {
			buffer.insertAt(cursor.offset, '\n\n');
			cursor.moveRight(buffer);
			cursor.moveRight(buffer);
		} else {
			buffer.insertAt(cursor.offset, char);
			cursor.moveRight(buffer);
		}
	}

	static delete(buffer, cursor) {
		if (cursor.offset > 0) {
			let text = buffer.getText();
			if (text[cursor.offset - 1] === '\n') {
				buffer.deleteAt(cursor.offset - 2, 2);
				cursor.moveLeft(buffer);
				cursor.moveLeft(buffer);
			} else {
				// Blockquote
				if (text[cursor.offset - 1] === ' ' && text[cursor.offset - 2] === '>' && (cursor.offset - 3 >= 0 && text[cursor.offset - 3] === '\n')) {
					buffer.deleteAt(cursor.offset - 2, 2);
					cursor.moveLeft(buffer);
					cursor.moveLeft(buffer);

				// Paragraph
				} else {
					buffer.deleteAt(cursor.offset - 1, 1);
					cursor.moveLeft(buffer);
				}
			}
		}
	}

	/* Private
	   ======= */
	static _nextElement(text, index) {
		if (this._isHeader(text, index) === true) {
			return this._getHeader(text, index);
		} else {
			return this._getParagraph(text, index);
		}
	}

	static _isHeader(text, index) {
		let i = index.pos;
		while (text[i] === '#') {
			i++;
		}

		if (i !==  index.pos && text[i] === ' ' && i - index.pos <= 3) {
			return true;
		} else {
			return false;
		}
	}

	static _getHeader(text, index) {
		// Determine what type of header it is
		let i = 0;
		while (text[index.pos + i] === '#') {
			i++;
		}
		let header = `<span class="h${i}">`;

		// Get header content
		while (text[index.pos] !== '\n' && index.pos < text.length) {
			header += text[index.pos];
			index.pos += 1;
		}

		header += '\n</span>';

		return header;
	}

	static _getParagraph(text, index) {
		let paragraph = '<span class="paragraph">';

		// Get content
		while (index.pos < text.length) {
			if (text[index.pos] === '\n') {
				if (this._isNewElement(text, index)) {
					break;
				}

				index.pos += 1;
			}

			paragraph += text[index.pos];
			index.pos += 1;
		}

		paragraph += '</span>';

		return paragraph;
	}

	static _isNewElement(text, index) {
		if (text[index.pos + 1] === '\n' || this._isHeader(text, index.pos + 1)) {
			return true;
		} else {
			return false;
		}
	}

	static _inline_stylize(stylized) {
		// Bold text
		let boldRegex = /\*[^\* \t\n](((?!\n\n)[^\*])*[^\* \t\n])?\*/gm;
		/*stylized = stylized.replace(boldRegex, function(match) {
			return '<span class="notation">*</span><span class=\"bold\">' + match.substring(1, match.length - 1) + '</span><span class="notation">*</span>';
		});*/

		return stylized;
	}

}
