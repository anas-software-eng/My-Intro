/**
 * Split a title into words, flagging any word that falls inside the
 * highlighted phrase so it can be rendered with the gradient treatment.
 */
export function buildWords(title, highlight) {
    if (!highlight || !title.includes(highlight)) {
        return String(title).split(' ').map((text) => ({ text, gradient: false }));
    }

    const start = title.indexOf(highlight);
    const end = start + highlight.length;
    const words = [];
    let index = 0;

    for (const text of title.split(' ')) {
        const wordStart = index;
        const wordEnd = index + text.length;
        words.push({ text, gradient: wordStart >= start && wordEnd <= end });
        index = wordEnd + 1;
    }

    return words;
}
