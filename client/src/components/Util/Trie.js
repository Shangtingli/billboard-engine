export default class Trie {

    /**
     * Creates a Trie
     * @return {Object} Trie
     */
    constructor() {
        this.words = 0;
        this.prefixes = 0;
        this.children = [];
    }

    /**
     * Insert a string into the Trie
     * @param  {String} str String to add
     * @param  {Number} pos Optional position in Trie
     * @return {}
     */
    insert (str, pos = 0) {
        if (str.length === 0) {
            return;
        }
        if (pos === str.length) {
            this.words++;
            return;
        }
        this.prefixes++;
        const k = str[pos];
        if (this.children[k] === undefined) {
            this.children[k] = new Trie();
        }
        const child = this.children[k];
        child.insert(str, pos + 1);
    }

    /**
     * Remove a string from Trie
     * @param  {String} str String to remove
     * @param  {Number} pos Optional position to remove
     * @return {}
     */
    remove (str, pos = 0) {
        if (pos === str.length) {
            this.words--;
        }
        if (str.length === 0 || this === undefined) {
            return;
        }
        this.prefixes--;
        const k = str[pos];
        const child = this.children[k];
        if (child) {
            child.remove(str, pos + 1);
        }
    }

    /**
     * Return all words in Trie with a given prefix
     * @param  {String} str Prefix to search for
     * @return {Array} Array of strings that match for prefix
     */
    getAllWords (str = '') {
        /* Array of prefixs we are iterating through */
        let wordStack = [];

        /* if this current leaf child, end */
        if (this === undefined) {
            return [];
        }

        /* Check to see if this child node has words left */
        if (this.words > 0) {
            wordStack.push(str);
        }

        /* Iterate through all children and build up the prefixes to the wordStack */
        for (const k in this.children) {
            if ({}.hasOwnProperty.call(this.children, k)) {
                const child = this.children[k];
                wordStack = wordStack.concat(child.getAllWords(str + k));
            }
        }
        return wordStack;
    }

    /**
     * Returns the autoComplete object
     * @param  {String} str String to search for
     * @param  {Number} pos Optional position
     * @return {Object} Returns an object where prev is the current string that is
     * being searched and found is the array of matching words
     */
    autoComplete (str, pos = 0) {
        if (str.length === 0) {
            return {};
        }
        const k = str[pos];
        const child = this.children[k];

        if (child === undefined) {
            return {};
        }
        if (pos === str.length - 1) {
            return { prev: str, found: child.getAllWords(str) };
        }
        return child.autoComplete(str, pos + 1);
    }
}