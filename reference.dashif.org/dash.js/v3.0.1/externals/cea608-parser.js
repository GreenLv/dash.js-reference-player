/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2015-2016, DASH Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  1. Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  2. Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
(function(exports) {

    "use strict";

    /**
     *  Exceptions from regular ASCII. CodePoints are mapped to UTF-16 codes
     */

    var specialCea608CharsCodes = {
        0x2a: 0xe1, // lowercase a, acute accent
        0x5c: 0xe9, // lowercase e, acute accent
        0x5e: 0xed, // lowercase i, acute accent
        0x5f: 0xf3, // lowercase o, acute accent
        0x60: 0xfa, // lowercase u, acute accent
        0x7b: 0xe7, // lowercase c with cedilla
        0x7c: 0xf7, // division symbol
        0x7d: 0xd1, // uppercase N tilde
        0x7e: 0xf1, // lowercase n tilde
        0x7f: 0x2588, // Full block
        // THIS BLOCK INCLUDES THE 16 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
        // THAT COME FROM HI BYTE=0x11 AND LOW BETWEEN 0x30 AND 0x3F
        // THIS MEANS THAT \x50 MUST BE ADDED TO THE VALUES
        0x80: 0xae, // Registered symbol (R)
        0x81: 0xb0, // degree sign
        0x82: 0xbd, // 1/2 symbol
        0x83: 0xbf, // Inverted (open) question mark
        0x84: 0x2122, // Trademark symbol (TM)
        0x85: 0xa2, // Cents symbol
        0x86: 0xa3, // Pounds sterling
        0x87: 0x266a, // Music 8'th note
        0x88: 0xe0, // lowercase a, grave accent
        0x89: 0x20, // transparent space (regular)
        0x8a: 0xe8, // lowercase e, grave accent
        0x8b: 0xe2, // lowercase a, circumflex accent
        0x8c: 0xea, // lowercase e, circumflex accent
        0x8d: 0xee, // lowercase i, circumflex accent
        0x8e: 0xf4, // lowercase o, circumflex accent
        0x8f: 0xfb, // lowercase u, circumflex accent
        // THIS BLOCK INCLUDES THE 32 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
        // THAT COME FROM HI BYTE=0x12 AND LOW BETWEEN 0x20 AND 0x3F
        0x90: 0xc1, // capital letter A with acute
        0x91: 0xc9, // capital letter E with acute
        0x92: 0xd3, // capital letter O with acute
        0x93: 0xda, // capital letter U with acute
        0x94: 0xdc, // capital letter U with diaresis
        0x95: 0xfc, // lowercase letter U with diaeresis
        0x96: 0x2018, // opening single quote
        0x97: 0xa1, // inverted exclamation mark
        0x98: 0x2a, // asterisk
        0x99: 0x2019, // closing single quote
        0x9a: 0x2501, // box drawings heavy horizontal
        0x9b: 0xa9, // copyright sign
        0x9c: 0x2120, // Service mark
        0x9d: 0x2022, // (round) bullet
        0x9e: 0x201c, // Left double quotation mark
        0x9f: 0x201d, // Right double quotation mark
        0xa0: 0xc0, // uppercase A, grave accent
        0xa1: 0xc2, // uppercase A, circumflex
        0xa2: 0xc7, // uppercase C with cedilla
        0xa3: 0xc8, // uppercase E, grave accent
        0xa4: 0xca, // uppercase E, circumflex
        0xa5: 0xcb, // capital letter E with diaresis
        0xa6: 0xeb, // lowercase letter e with diaresis
        0xa7: 0xce, // uppercase I, circumflex
        0xa8: 0xcf, // uppercase I, with diaresis
        0xa9: 0xef, // lowercase i, with diaresis
        0xaa: 0xd4, // uppercase O, circumflex
        0xab: 0xd9, // uppercase U, grave accent
        0xac: 0xf9, // lowercase u, grave accent
        0xad: 0xdb, // uppercase U, circumflex
        0xae: 0xab, // left-pointing double angle quotation mark
        0xaf: 0xbb, // right-pointing double angle quotation mark
        // THIS BLOCK INCLUDES THE 32 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
        // THAT COME FROM HI BYTE=0x13 AND LOW BETWEEN 0x20 AND 0x3F
        0xb0: 0xc3, // Uppercase A, tilde
        0xb1: 0xe3, // Lowercase a, tilde
        0xb2: 0xcd, // Uppercase I, acute accent
        0xb3: 0xcc, // Uppercase I, grave accent
        0xb4: 0xec, // Lowercase i, grave accent
        0xb5: 0xd2, // Uppercase O, grave accent
        0xb6: 0xf2, // Lowercase o, grave accent
        0xb7: 0xd5, // Uppercase O, tilde
        0xb8: 0xf5, // Lowercase o, tilde
        0xb9: 0x7b, // Open curly brace
        0xba: 0x7d, // Closing curly brace
        0xbb: 0x5c, // Backslash
        0xbc: 0x5e, // Caret
        0xbd: 0x5f, // Underscore
        0xbe: 0x7c, // Pipe (vertical line)
        0xbf: 0x223c, // Tilde operator
        0xc0: 0xc4, // Uppercase A, umlaut
        0xc1: 0xe4, // Lowercase A, umlaut
        0xc2: 0xd6, // Uppercase O, umlaut
        0xc3: 0xf6, // Lowercase o, umlaut
        0xc4: 0xdf, // Esszett (sharp S)
        0xc5: 0xa5, // Yen symbol
        0xc6: 0xa4, // Generic currency sign
        0xc7: 0x2503, // Box drawings heavy vertical
        0xc8: 0xc5, // Uppercase A, ring
        0xc9: 0xe5, // Lowercase A, ring
        0xca: 0xd8, // Uppercase O, stroke
        0xcb: 0xf8, // Lowercase o, strok
        0xcc: 0x250f, // Box drawings heavy down and right
        0xcd: 0x2513, // Box drawings heavy down and left
        0xce: 0x2517, // Box drawings heavy up and right
        0xcf: 0x251b // Box drawings heavy up and left
    };

    /**
     * Get Unicode Character from CEA-608 byte code
     */
    var getCharForByte = function(byte) {
        var charCode = byte;
        if (specialCea608CharsCodes.hasOwnProperty(byte)) {
            charCode = specialCea608CharsCodes[byte];
        }
        return String.fromCharCode(charCode);
    };

    var NR_ROWS = 15,
        NR_COLS = 32;
    // Tables to look up row from PAC data
    var rowsLowCh1 = {
        0x11: 1,
        0x12: 3,
        0x15: 5,
        0x16: 7,
        0x17: 9,
        0x10: 11,
        0x13: 12,
        0x14: 14
    };
    var rowsHighCh1 = {
        0x11: 2,
        0x12: 4,
        0x15: 6,
        0x16: 8,
        0x17: 10,
        0x13: 13,
        0x14: 15
    };
    var rowsLowCh2 = {
        0x19: 1,
        0x1A: 3,
        0x1D: 5,
        0x1E: 7,
        0x1F: 9,
        0x18: 11,
        0x1B: 12,
        0x1C: 14
    };
    var rowsHighCh2 = {
        0x19: 2,
        0x1A: 4,
        0x1D: 6,
        0x1E: 8,
        0x1F: 10,
        0x1B: 13,
        0x1C: 15
    };

    var backgroundColors = ['white', 'green', 'blue', 'cyan', 'red', 'yellow', 'magenta', 'black', 'transparent'];

    /**
     * Simple logger class to be able to write with time-stamps and filter on level.
     */
    var logger = {
        verboseFilter: {
            'DATA': 3,
            'DEBUG': 3,
            'INFO': 2,
            'WARNING': 2,
            'TEXT': 1,
            'ERROR': 0
        },
        time: null,
        verboseLevel: 0, // Only write errors
        setTime: function(newTime) {
            this.time = newTime;
        },
        log: function(severity, msg) {
            var minLevel = this.verboseFilter[severity];
            if (this.verboseLevel >= minLevel) {
                console.log(this.time + " [" + severity + "] " + msg);
            }
        }
    };

    var numArrayToHexArray = function(numArray) {
        var hexArray = [];
        for (var j = 0; j < numArray.length; j++) {
            hexArray.push(numArray[j].toString(16));
        }
        return hexArray;
    };

    /**
     * State of CEA-608 pen or character
     * @constructor
     */
    var PenState = function(foreground, underline, italics, background, flash) {
        this.foreground = foreground || "white";
        this.underline = underline || false;
        this.italics = italics || false;
        this.background = background || "black";
        this.flash = flash || false;
    };

    PenState.prototype = {

        reset: function() {
            this.foreground = "white";
            this.underline = false;
            this.italics = false;
            this.background = "black";
            this.flash = false;
        },

        setStyles: function(styles) {
            var attribs = ["foreground", "underline", "italics", "background", "flash"];
            for (var i = 0; i < attribs.length; i++) {
                var style = attribs[i];
                if (styles.hasOwnProperty(style)) {
                    this[style] = styles[style];
                }
            }
        },

        isDefault: function() {
            return (this.foreground === "white" && !this.underline && !this.italics &&
                this.background === "black" && !this.flash);
        },

        equals: function(other) {
            return ((this.foreground === other.foreground) &&
                (this.underline === other.underline) &&
                (this.italics === other.italics) &&
                (this.background === other.background) &&
                (this.flash === other.flash));
        },

        copy: function(newPenState) {
            this.foreground = newPenState.foreground;
            this.underline = newPenState.underline;
            this.italics = newPenState.italics;
            this.background = newPenState.background;
            this.flash = newPenState.flash;
        },

        toString: function() {
            return ("color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics +
                ", background=" + this.background + ", flash=" + this.flash);
        }
    };

    /**
     * Unicode character with styling and background.
     * @constructor
     */
    var StyledUnicodeChar = function(uchar, foreground, underline, italics, background, flash) {
        this.uchar = uchar || ' '; // unicode character
        this.penState = new PenState(foreground, underline, italics, background, flash);
    };

    StyledUnicodeChar.prototype = {

        reset: function() {
            this.uchar = ' ';
            this.penState.reset();
        },

        setChar: function(uchar, newPenState) {
            this.uchar = uchar;
            this.penState.copy(newPenState);
        },

        setPenState: function(newPenState) {
            this.penState.copy(newPenState);
        },

        equals: function(other) {
            return this.uchar === other.uchar && this.penState.equals(other.penState);
        },

        copy: function(newChar) {
            this.uchar = newChar.uchar;
            this.penState.copy(newChar.penState);
        },

        isEmpty: function() {
            return this.uchar === ' ' && this.penState.isDefault();
        }
    };

    /**
     * CEA-608 row consisting of NR_COLS instances of StyledUnicodeChar.
     * @constructor
     */
    var Row = function() {
        this.chars = [];
        for (var i = 0; i < NR_COLS; i++) {
            this.chars.push(new StyledUnicodeChar());
        }
        this.pos = 0;
        this.currPenState = new PenState();
    };

    Row.prototype = {

        equals: function(other) {
            var equal = true;
            for (var i = 0; i < NR_COLS; i++) {
                if (!this.chars[i].equals(other.chars[i])) {
                    equal = false;
                    break;
                }
            }
            return equal;
        },

        copy: function(other) {
            for (var i = 0; i < NR_COLS; i++) {
                this.chars[i].copy(other.chars[i]);
            }
        },

        isEmpty: function() {
            var empty = true;
            for (var i = 0; i < NR_COLS; i++) {
                if (!this.chars[i].isEmpty()) {
                    empty = false;
                    break;
                }
            }
            return empty;
        },

        /**
         *  Set the cursor to a valid column.
         */
        setCursor: function(absPos) {
            if (this.pos !== absPos) {
                this.pos = absPos;
            }
            if (this.pos < 0) {
                logger.log("ERROR", "Negative cursor position " + this.pos);
                this.pos = 0;
            } else if (this.pos > NR_COLS) {
                logger.log("ERROR", "Too large cursor position " + this.pos);
                this.pos = NR_COLS;
            }
        },

        /** 
         * Move the cursor relative to current position.
         */
        moveCursor: function(relPos) {
            var newPos = this.pos + relPos;
            if (relPos > 1) {
                for (var i = this.pos + 1; i < newPos + 1; i++) {
                    this.chars[i].setPenState(this.currPenState);
                }
            }
            this.setCursor(newPos);
        },

        /**
         * Backspace, move one step back and clear character.
         */
        backSpace: function() {
            this.moveCursor(-1);
            this.chars[this.pos].setChar(' ', this.currPenState);
        },

        insertChar: function(byte) {
            if (byte >= 0x90) { //Extended char
                this.backSpace();
            }
            var char = getCharForByte(byte);
            if (this.pos >= NR_COLS) {
                logger.log("ERROR", "Cannot insert " + byte.toString(16) +
                    " (" + char + ") at position " + this.pos + ". Skipping it!");
                return;
            }
            this.chars[this.pos].setChar(char, this.currPenState);
            this.moveCursor(1);
        },

        clearFromPos: function(startPos) {
            var i;
            for (i = startPos; i < NR_COLS; i++) {
                this.chars[i].reset();
            }
        },

        clear: function() {
            this.clearFromPos(0);
            this.pos = 0;
            this.currPenState.reset();
        },

        clearToEndOfRow: function() {
            this.clearFromPos(this.pos);
        },

        getTextString: function() {
            var chars = [];
            var empty = true;
            for (var i = 0; i < NR_COLS; i++) {
                var char = this.chars[i].uchar;
                if (char !== " ") {
                    empty = false;
                }
                chars.push(char);
            }
            if (empty) {
                return "";
            } else {
                return chars.join("");
            }
        },

        setPenStyles: function(styles) {
            this.currPenState.setStyles(styles);
            var currChar = this.chars[this.pos];
            currChar.setPenState(this.currPenState);
        }
    };

    /**
     * Keep a CEA-608 screen of 32x15 styled characters
     * @constructor
     */
    var CaptionScreen = function() {

        this.rows = [];
        for (var i = 0; i < NR_ROWS; i++) {
            this.rows.push(new Row()); // Note that we use zero-based numbering (0-14)
        }
        this.currRow = NR_ROWS - 1;
        this.nrRollUpRows = null;
        this.reset();
    };

    CaptionScreen.prototype = {

        reset: function() {
            for (var i = 0; i < NR_ROWS; i++) {
                this.rows[i].clear();
            }
            this.currRow = NR_ROWS - 1;
        },

        equals: function(other) {
            var equal = true;
            for (var i = 0; i < NR_ROWS; i++) {
                if (!this.rows[i].equals(other.rows[i])) {
                    equal = false;
                    break;
                }
            }
            return equal;
        },

        copy: function(other) {
            for (var i = 0; i < NR_ROWS; i++) {
                this.rows[i].copy(other.rows[i]);
            }
        },

        isEmpty: function() {
            var empty = true;
            for (var i = 0; i < NR_ROWS; i++) {
                if (!this.rows[i].isEmpty()) {
                    empty = false;
                    break;
                }
            }
            return empty;
        },

        backSpace: function() {
            var row = this.rows[this.currRow];
            row.backSpace();
        },

        clearToEndOfRow: function() {
            var row = this.rows[this.currRow];
            row.clearToEndOfRow();
        },

        /**
         * Insert a character (without styling) in the current row.
         */
        insertChar: function(char) {
            var row = this.rows[this.currRow];
            row.insertChar(char);
        },

        setPen: function(styles) {
            var row = this.rows[this.currRow];
            row.setPenStyles(styles);
        },

        moveCursor: function(relPos) {
            var row = this.rows[this.currRow];
            row.moveCursor(relPos);
        },

        setCursor: function(absPos) {
            logger.log("INFO", "setCursor: " + absPos);
            var row = this.rows[this.currRow];
            row.setCursor(absPos);
        },

        setPAC: function(pacData) {
            logger.log("INFO", "pacData = " + JSON.stringify(pacData));
            var newRow = pacData.row - 1;
            if (this.nrRollUpRows && newRow < this.nrRollUpRows - 1) {
                newRow = this.nrRollUpRows - 1;
            }
            this.currRow = newRow;
            var row = this.rows[this.currRow];
            if (pacData.indent !== null) {
                var indent = pacData.indent;
                var prevPos = Math.max(indent - 1, 0);
                row.setCursor(pacData.indent);
                pacData.color = row.chars[prevPos].penState.foreground;
            }
            var styles = {
                foreground: pacData.color,
                underline: pacData.underline,
                italics: pacData.italics,
                background: 'black',
                flash: false
            };
            this.setPen(styles);
        },

        /**
         * Set background/extra foreground, but first do back_space, and then insert space (backwards compatibility).
         */
        setBkgData: function(bkgData) {

            logger.log("INFO", "bkgData = " + JSON.stringify(bkgData));
            this.backSpace();
            this.setPen(bkgData);
            this.insertChar(0x20); //Space
        },

        setRollUpRows: function(nrRows) {
            this.nrRollUpRows = nrRows;
        },

        rollUp: function() {
            if (this.nrRollUpRows === null) {
                logger.log("DEBUG", "roll_up but nrRollUpRows not set yet");
                return; //Not properly setup
            }
            logger.log("TEXT", this.getDisplayText());
            var topRowIndex = this.currRow + 1 - this.nrRollUpRows;
            var topRow = this.rows.splice(topRowIndex, 1)[0];
            topRow.clear();
            this.rows.splice(this.currRow, 0, topRow);
            logger.log("INFO", "Rolling up");
            //logger.log("TEXT", this.get_display_text())
        },

        /**
         * Get all non-empty rows with as unicode text. 
         */
        getDisplayText: function(asOneRow) {
            asOneRow = asOneRow || false;
            var displayText = [];
            var text = "";
            var rowNr = -1;
            for (var i = 0; i < NR_ROWS; i++) {
                var rowText = this.rows[i].getTextString();
                if (rowText) {
                    rowNr = i + 1;
                    if (asOneRow) {
                        displayText.push("Row " + rowNr + ': "' + rowText + '"');
                    } else {
                        displayText.push(rowText.trim());
                    }
                }
            }
            if (displayText.length > 0) {
                if (asOneRow) {
                    text = "[" + displayText.join(" | ") + "]";
                } else {
                    text = displayText.join("\n");
                }
            }
            return text;
        },

        getTextAndFormat: function() {
            return this.rows;
        }
    };

    /**
     * Handle a CEA-608 channel and send decoded data to outputFilter
     * @constructor
     * @param {Number} channelNumber (1 or 2)
     * @param {CueHandler} outputFilter Output from channel1 newCue(startTime, endTime, captionScreen)
     */
    var Cea608Channel = function(channelNumber, outputFilter) {

        this.chNr = channelNumber;
        this.outputFilter = outputFilter;
        this.mode = null;
        this.verbose = 0;
        this.displayedMemory = new CaptionScreen();
        this.nonDisplayedMemory = new CaptionScreen();
        this.lastOutputScreen = new CaptionScreen();
        this.currRollUpRow = this.displayedMemory.rows[NR_ROWS - 1];
        this.writeScreen = this.displayedMemory;
        this.mode = null;
        this.cueStartTime = null; // Keeps track of where a cue started.
    };

    Cea608Channel.prototype = {

        modes: ["MODE_ROLL-UP", "MODE_POP-ON", "MODE_PAINT-ON", "MODE_TEXT"],

        reset: function() {
            this.mode = null;
            this.displayedMemory.reset();
            this.nonDisplayedMemory.reset();
            this.lastOutputScreen.reset();
            this.currRollUpRow = this.displayedMemory.rows[NR_ROWS - 1];
            this.writeScreen = this.displayedMemory;
            this.mode = null;
            this.cueStartTime = null;
            this.lastCueEndTime = null;
        },

        getHandler: function() {
            return this.outputFilter;
        },

        setHandler: function(newHandler) {
            this.outputFilter = newHandler;
        },

        setPAC: function(pacData) {
            this.writeScreen.setPAC(pacData);
        },

        setBkgData: function(bkgData) {
            this.writeScreen.setBkgData(bkgData);
        },

        setMode: function(newMode) {
            if (newMode === this.mode) {
                return;
            }
            this.mode = newMode;
            logger.log("INFO", "MODE=" + newMode);
            if (this.mode == "MODE_POP-ON") {
                this.writeScreen = this.nonDisplayedMemory;
            } else {
                this.writeScreen = this.displayedMemory;
                this.writeScreen.reset();
            }
            if (this.mode !== "MODE_ROLL-UP") {
                this.displayedMemory.nrRollUpRows = null;
                this.nonDisplayedMemory.nrRollUpRows = null;
            }
            this.mode = newMode;
        },

        insertChars: function(chars) {
            for (var i = 0; i < chars.length; i++) {
                this.writeScreen.insertChar(chars[i]);
            }
            var screen = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
            logger.log("INFO", screen + ": " + this.writeScreen.getDisplayText(true));
            if (this.mode === "MODE_PAINT-ON" || this.mode === "MODE_ROLL-UP") {
                logger.log("TEXT", "DISPLAYED: " + this.displayedMemory.getDisplayText(true));
                this.outputDataUpdate();
            }
        },

        cc_RCL: function() { // Resume Caption Loading (switch mode to Pop On)
            logger.log("INFO", "RCL - Resume Caption Loading");
            this.setMode("MODE_POP-ON");
        },
        cc_BS: function() { // BackSpace
            logger.log("INFO", "BS - BackSpace");
            if (this.mode === "MODE_TEXT") {
                return;
            }
            this.writeScreen.backSpace();
            if (this.writeScreen === this.displayedMemory) {
                this.outputDataUpdate();
            }
        },
        cc_AOF: function() { // Reserved (formerly Alarm Off)
            return;
        },
        cc_AON: function() { // Reserved (formerly Alarm On)
            return;
        },
        cc_DER: function() { // Delete to End of Row
            logger.log("INFO", "DER- Delete to End of Row");
            this.writeScreen.clearToEndOfRow();
            this.outputDataUpdate();
        },
        cc_RU: function(nrRows) { //Roll-Up Captions-2,3,or 4 Rows
            logger.log("INFO", "RU(" + nrRows + ") - Roll Up");
            this.writeScreen = this.displayedMemory;
            this.setMode("MODE_ROLL-UP");
            this.writeScreen.setRollUpRows(nrRows);
        },
        cc_FON: function() { //Flash On
            logger.log("INFO", "FON - Flash On");
            this.writeScreen.setPen({
                flash: true
            });
        },
        cc_RDC: function() { // Resume Direct Captioning (switch mode to PaintOn)
            logger.log("INFO", "RDC - Resume Direct Captioning");
            this.setMode("MODE_PAINT-ON");
        },
        cc_TR: function() { // Text Restart in text mode (not supported, however)
            logger.log("INFO", "TR");
            this.setMode("MODE_TEXT");
        },
        cc_RTD: function() { // Resume Text Display in Text mode (not supported, however)
            logger.log("INFO", "RTD");
            this.setMode("MODE_TEXT");
        },
        cc_EDM: function() { // Erase Displayed Memory
            logger.log("INFO", "EDM - Erase Displayed Memory");
            this.displayedMemory.reset();
            this.outputDataUpdate();
        },
        cc_CR: function() { // Carriage Return
            logger.log("CR - Carriage Return");
            this.writeScreen.rollUp();
            this.outputDataUpdate();
        },
        cc_ENM: function() { //Erase Non-Displayed Memory
            logger.log("INFO", "ENM - Erase Non-displayed Memory");
            this.nonDisplayedMemory.reset();
        },
        cc_EOC: function() { //End of Caption (Flip Memories)
            logger.log("INFO", "EOC - End Of Caption");
            if (this.mode === "MODE_POP-ON") {
                var tmp = this.displayedMemory;
                this.displayedMemory = this.nonDisplayedMemory;
                this.nonDisplayedMemory = tmp;
                this.writeScreen = this.nonDisplayedMemory;
                logger.log("TEXT", "DISP: " + this.displayedMemory.getDisplayText());
            }
            this.outputDataUpdate();
        },
        cc_TO: function(nrCols) { // Tab Offset 1,2, or 3 columns
            logger.log("INFO", "TO(" + nrCols + ") - Tab Offset");
            this.writeScreen.moveCursor(nrCols);
        },
        cc_MIDROW: function(secondByte) { // Parse MIDROW command
            var styles = {
                flash: false
            };
            styles.underline = secondByte % 2 === 1;
            styles.italics = secondByte >= 0x2e;
            if (!styles.italics) {
                var colorIndex = Math.floor(secondByte / 2) - 0x10;
                var colors = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"];
                styles.foreground = colors[colorIndex];
            } else {
                styles.foreground = "white";
            }
            logger.log("INFO", "MIDROW: " + JSON.stringify(styles));
            this.writeScreen.setPen(styles);
        },

        outputDataUpdate: function() {
            var t = logger.time;
            if (t === null) {
                return;
            }
            if (this.outputFilter) {
                if (this.outputFilter.updateData) {
                    this.outputFilter.updateData(t, this.displayedMemory);
                }
                if (this.cueStartTime === null && !this.displayedMemory.isEmpty()) { // Start of a new cue
                    this.cueStartTime = t;
                } else {
                    if (!this.displayedMemory.equals(this.lastOutputScreen)) {
                        if (this.outputFilter.newCue) {
                            this.outputFilter.newCue(this.cueStartTime, t, this.lastOutputScreen);
                        }
                        this.cueStartTime = this.displayedMemory.isEmpty() ? null : t;
                    }
                }
                this.lastOutputScreen.copy(this.displayedMemory);
            }
        },

        cueSplitAtTime: function(t) {
            if (this.outputFilter) {
                if (!this.displayedMemory.isEmpty()) {
                    if (this.outputFilter.newCue) {
                        this.outputFilter.newCue(this.cueStartTime, t, this.displayedMemory);
                    }
                    this.cueStartTime = t;
                }
            }
        }
    };

    /**
     * Parse CEA-608 data and send decoded data to out1 and out2.
     * @constructor
     * @param {Number} field  CEA-608 field (1 or 2)
     * @param {CueHandler} out1 Output from channel1 newCue(startTime, endTime, captionScreen)
     * @param {CueHandler} out2 Output from channel2 newCue(startTime, endTime, captionScreen)
     */
    var Cea608Parser = function(field, out1, out2) {
        this.field = field || 1;
        this.outputs = [out1, out2];
        this.channels = [new Cea608Channel(1, out1), new Cea608Channel(2, out2)];
        this.currChNr = -1; // Will be 1 or 2
        this.lastCmdA = null; // First byte of last command
        this.lastCmdB = null; // Second byte of last command
        this.bufferedData = [];
        this.startTime = null;
        this.lastTime = null;
        this.dataCounters = {
            'padding': 0,
            'char': 0,
            'cmd': 0,
            'other': 0
        };
    };

    Cea608Parser.prototype = {

        getHandler: function(index) {
            return this.channels[index].getHandler();
        },

        setHandler: function(index, newHandler) {
            this.channels[index].setHandler(newHandler);
        },

        /**
         * Add data for time t in forms of list of bytes (unsigned ints). The bytes are treated as pairs.
         */
        addData: function(t, byteList) {
            var cmdFound, a, b,
                charsFound = false;

            this.lastTime = t;
            logger.setTime(t);

            for (var i = 0; i < byteList.length; i += 2) {
                a = byteList[i] & 0x7f;
                b = byteList[i + 1] & 0x7f;

                if (a >= 0x10 && a <= 0x1f && a === this.lastCmdA && b === this.lastCmdB) {
                    this.lastCmdA = null;
                    this.lastCmdB = null;
                    logger.log("DEBUG", "Repeated command (" + numArrayToHexArray([a, b]) + ") is dropped");
                    continue; // Repeated commands are dropped (once)
                }

                if (a === 0 && b === 0) {
                    this.dataCounters.padding += 2;
                    continue;
                } else {
                    logger.log("DATA", "[" + numArrayToHexArray([byteList[i], byteList[i + 1]]) + "] -> (" + numArrayToHexArray([a, b]) + ")");
                }
                cmdFound = this.parseCmd(a, b);
                if (!cmdFound) {
                    cmdFound = this.parseMidrow(a, b);
                }
                if (!cmdFound) {
                    cmdFound = this.parsePAC(a, b);
                }
                if (!cmdFound) {
                    cmdFound = this.parseBackgroundAttributes(a, b);
                }
                if (!cmdFound) {
                    charsFound = this.parseChars(a, b);
                    if (charsFound) {
                        if (this.currChNr && this.currChNr >= 0) {
                            var channel = this.channels[this.currChNr - 1];
                            channel.insertChars(charsFound);
                        } else {
                            logger.log("WARNING", "No channel found yet. TEXT-MODE?");
                        }
                    }
                }
                if (cmdFound) {
                    this.dataCounters.cmd += 2;
                } else if (charsFound) {
                    this.dataCounters.char += 2;
                } else {
                    this.dataCounters.other += 2;
                    logger.log("WARNING", "Couldn't parse cleaned data " + numArrayToHexArray([a, b]) +
                        " orig: " + numArrayToHexArray([byteList[i], byteList[i + 1]]));
                }
            }
        },

        /**
         * Parse Command.
         * @returns {Boolean} Tells if a command was found
         */
        parseCmd: function(a, b) {
            var chNr = null;

            var cond1 = (a === 0x14 || a === 0x15 || a === 0x1C || a === 0x1D) && (0x20 <= b && b <= 0x2F);
            var cond2 = (a === 0x17 || a === 0x1F) && (0x21 <= b && b <= 0x23);
            if (!(cond1 || cond2)) {
                return false;
            }

            if (a === 0x14 || a === 0x15 || a === 0x17) {
                chNr = 1;
            } else {
                chNr = 2; // (a === 0x1C || a === 0x1D || a=== 0x1f)
            }

            var channel = this.channels[chNr - 1];

            if (a === 0x14 || a === 0x15 || a === 0x1C || a === 0x1D) {
                if (b === 0x20) {
                    channel.cc_RCL();
                } else if (b === 0x21) {
                    channel.cc_BS();
                } else if (b === 0x22) {
                    channel.cc_AOF();
                } else if (b === 0x23) {
                    channel.cc_AON();
                } else if (b === 0x24) {
                    channel.cc_DER();
                } else if (b === 0x25) {
                    channel.cc_RU(2);
                } else if (b === 0x26) {
                    channel.cc_RU(3);
                } else if (b === 0x27) {
                    channel.cc_RU(4);
                } else if (b === 0x28) {
                    channel.cc_FON();
                } else if (b === 0x29) {
                    channel.cc_RDC();
                } else if (b === 0x2A) {
                    channel.cc_TR();
                } else if (b === 0x2B) {
                    channel.cc_RTD();
                } else if (b === 0x2C) {
                    channel.cc_EDM();
                } else if (b === 0x2D) {
                    channel.cc_CR();
                } else if (b === 0x2E) {
                    channel.cc_ENM();
                } else if (b === 0x2F) {
                    channel.cc_EOC();
                }
            } else { //a == 0x17 || a == 0x1F
                channel.cc_TO(b - 0x20);
            }
            this.lastCmdA = a;
            this.lastCmdB = b;
            this.currChNr = chNr;
            return true;
        },

        /**
         * Parse midrow styling command
         * @returns {Boolean}
         */
        parseMidrow: function(a, b) {
            var chNr = null;

            if (((a === 0x11) || (a === 0x19)) && 0x20 <= b && b <= 0x2f) {
                if (a === 0x11) {
                    chNr = 1;
                } else {
                    chNr = 2;
                }
                if (chNr !== this.currChNr) {
                    logger.log("ERROR", "Mismatch channel in midrow parsing");
                    return false;
                }
                var channel = this.channels[chNr - 1];
                // cea608 spec says midrow codes should inject a space
                channel.insertChars([0x20]);
                channel.cc_MIDROW(b);
                logger.log("DEBUG", "MIDROW (" + numArrayToHexArray([a, b]) + ")");
                this.lastCmdA = a;
                this.lastCmdB = b;
                return true;
            }
            return false;
        },
        /**
         * Parse Preable Access Codes (Table 53).
         * @returns {Boolean} Tells if PAC found
         */
        parsePAC: function(a, b) {

            var chNr = null;
            var row = null;

            var case1 = ((0x11 <= a && a <= 0x17) || (0x19 <= a && a <= 0x1F)) && (0x40 <= b && b <= 0x7F);
            var case2 = (a === 0x10 || a === 0x18) && (0x40 <= b && b <= 0x5F);
            if (!(case1 || case2)) {
                return false;
            }

            chNr = (a <= 0x17) ? 1 : 2;

            if (0x40 <= b && b <= 0x5F) {
                row = (chNr === 1) ? rowsLowCh1[a] : rowsLowCh2[a];
            } else { // 0x60 <= b <= 0x7F
                row = (chNr === 1) ? rowsHighCh1[a] : rowsHighCh2[a];
            }
            var pacData = this.interpretPAC(row, b);
            var channel = this.channels[chNr - 1];
            channel.setPAC(pacData);
            this.lastCmdA = a;
            this.lastCmdB = b;
            this.currChNr = chNr;
            return true;
        },

        /**
         * Interpret the second byte of the pac, and return the information.
         * @returns {Object} pacData with style parameters.
         */
        interpretPAC: function(row, byte) {
            var pacIndex = byte;
            var pacData = {
                color: null,
                italics: false,
                indent: null,
                underline: false,
                row: row
            };

            if (byte > 0x5F) {
                pacIndex = byte - 0x60;
            } else {
                pacIndex = byte - 0x40;
            }
            pacData.underline = (pacIndex & 1) === 1;
            if (pacIndex <= 0xd) {
                pacData.color = ['white', 'green', 'blue', 'cyan', 'red', 'yellow', 'magenta', 'white'][Math.floor(pacIndex / 2)];
            } else if (pacIndex <= 0xf) {
                pacData.italics = true;
                pacData.color = 'white';
            } else {
                pacData.indent = (Math.floor((pacIndex - 0x10) / 2)) * 4;
            }
            return pacData; // Note that row has zero offset. The spec uses 1.
        },

        /**
         * Parse characters.
         * @returns An array with 1 to 2 codes corresponding to chars, if found. null otherwise.
         */
        parseChars: function(a, b) {

            var channelNr = null,
                charCodes = null,
                charCode1 = null,
                charCode2 = null;

            if (a >= 0x19) {
                channelNr = 2;
                charCode1 = a - 8;
            } else {
                channelNr = 1;
                charCode1 = a;
            }
            if (0x11 <= charCode1 && charCode1 <= 0x13) {
                // Special character
                var oneCode = b;
                if (charCode1 === 0x11) {
                    oneCode = b + 0x50;
                } else if (charCode1 === 0x12) {
                    oneCode = b + 0x70;
                } else {
                    oneCode = b + 0x90;
                }
                logger.log("INFO", "Special char '" + getCharForByte(oneCode) + "' in channel " + channelNr);
                charCodes = [oneCode];
                this.lastCmdA = a;
                this.lastCmdB = b;
            } else if (0x20 <= a && a <= 0x7f) {
                charCodes = (b === 0) ? [a] : [a, b];
                this.lastCmdA = null;
                this.lastCmdB = null;
            }
            if (charCodes) {
                var hexCodes = numArrayToHexArray(charCodes);
                logger.log("DEBUG", "Char codes =  " + hexCodes.join(","));
            }
            return charCodes;
        },

        /**
         * Parse extended background attributes as well as new foreground color black.
         * @returns{Boolean} Tells if background attributes are found
         */
        parseBackgroundAttributes: function(a, b) {
            var bkgData,
                index,
                chNr,
                channel;

            var case1 = (a === 0x10 || a === 0x18) && (0x20 <= b && b <= 0x2f);
            var case2 = (a === 0x17 || a === 0x1f) && (0x2d <= b && b <= 0x2f);
            if (!(case1 || case2)) {
                return false;
            }
            bkgData = {};
            if (a === 0x10 || a === 0x18) {
                index = Math.floor((b - 0x20) / 2);
                bkgData.background = backgroundColors[index];
                if (b % 2 === 1) {
                    bkgData.background = bkgData.background + "_semi";
                }
            } else if (b === 0x2d) {
                bkgData.background = "transparent";
            } else {
                bkgData.foreground = "black";
                if (b === 0x2f) {
                    bkgData.underline = true;
                }
            }
            chNr = (a < 0x18) ? 1 : 2;
            channel = this.channels[chNr - 1];
            channel.setBkgData(bkgData);
            this.lastCmdA = a;
            this.lastCmdB = b;
            return true;
        },

        /**
         * Reset state of parser and its channels.
         */
        reset: function() {
            for (var i = 0; i < this.channels.length; i++) {
                if (this.channels[i]) {
                    this.channels[i].reset();
                }
            }
            this.lastCmdA = null;
            this.lastCmdB = null;
        },

        /**
         * Trigger the generation of a cue, and the start of a new one if displayScreens are not empty.
         */
        cueSplitAtTime: function(t) {
            for (var i = 0; i < this.channels.length; i++) {
                if (this.channels[i]) {
                    this.channels[i].cueSplitAtTime(t);
                }
            }
        },
    };

    /**
     * Find ranges corresponding to SEA CEA-608 NALUS in sizeprepended NALU array.
     * @param {raw} dataView of binary data
     * @param {startPos} start position in raw
     * @param {size} total size of data in raw to consider
     * @returns 
     */
    var findCea608Nalus = function(raw, startPos, size) {
        var nalSize = 0,
            cursor = startPos,
            nalType = 0,
            cea608NaluRanges = [],
            // Check SEI data according to ANSI-SCTE 128
            isCEA608SEI = function(payloadType, payloadSize, raw, pos) {
                if (payloadType !== 4 || payloadSize < 8) {
                    return null;
                }
                var countryCode = raw.getUint8(pos);
                var providerCode = raw.getUint16(pos + 1);
                var userIdentifier = raw.getUint32(pos + 3);
                var userDataTypeCode = raw.getUint8(pos + 7);
                return countryCode == 0xB5 && providerCode == 0x31 && userIdentifier == 0x47413934 && userDataTypeCode == 0x3;
            };
        while (cursor < startPos + size) {
            nalSize = raw.getUint32(cursor);
            nalType = raw.getUint8(cursor + 4) & 0x1F;
            //console.log(time + "  NAL " + nalType);
            if (nalType === 6) {
                // SEI NAL Unit. The NAL header is the first byte
                //console.log("SEI NALU of size " + nalSize + " at time " + time);
                var pos = cursor + 5;
                var payloadType = -1;
                while (pos < cursor + 4 + nalSize - 1) { // The last byte should be rbsp_trailing_bits
                    payloadType = 0;
                    var b = 0xFF;
                    while (b === 0xFF) {
                        b = raw.getUint8(pos);
                        payloadType += b;
                        pos++;
                    }
                    var payloadSize = 0;
                    b = 0xFF;
                    while (b === 0xFF) {
                        b = raw.getUint8(pos);
                        payloadSize += b;
                        pos++;
                    }
                    if (isCEA608SEI(payloadType, payloadSize, raw, pos)) {
                        //console.log("CEA608 SEI " + time + " " + payloadSize);
                        cea608NaluRanges.push([pos, payloadSize]);
                    }
                    pos += payloadSize;
                }
            }
            cursor += nalSize + 4;
        }
        return cea608NaluRanges;
    };

    var extractCea608DataFromRange = function(raw, cea608Range) {
        var pos = cea608Range[0];
        var fieldData = [
            [],
            []
        ];

        pos += 8; // Skip the identifier up to userDataTypeCode
        var ccCount = raw.getUint8(pos) & 0x1f;
        pos += 2; // Advance 1 and skip reserved byte

        for (var i = 0; i < ccCount; i++) {
            var byte = raw.getUint8(pos);
            var ccValid = byte & 0x4;
            var ccType = byte & 0x3;
            pos++;
            var ccData1 = raw.getUint8(pos); // Keep parity bit
            pos++;
            var ccData2 = raw.getUint8(pos); // Keep parity bit
            pos++;
            if (ccValid && ((ccData1 & 0x7f) + (ccData2 & 0x7f) !== 0)) { //Check validity and non-empty data
                if (ccType === 0) {
                    fieldData[0].push(ccData1);
                    fieldData[0].push(ccData2);
                } else if (ccType === 1) {
                    fieldData[1].push(ccData1);
                    fieldData[1].push(ccData2);
                }
            }
        }
        return fieldData;
    };

    exports.logger = logger;
    exports.PenState = PenState;
    exports.CaptionScreen = CaptionScreen;
    exports.Cea608Parser = Cea608Parser;
    exports.findCea608Nalus = findCea608Nalus;
    exports.extractCea608DataFromRange = extractCea608DataFromRange;

}(typeof exports === 'undefined' ? this.cea608parser = {} : exports));