const versionFormatter = async (wordKey, editor, timestamp, translations) => {
    return {
        key: wordKey,
        edits: {
            editor: editor,
            timestamp: timestamp,
        },
        translations: translations
    };
}
module.exports = {versionFormatter};
