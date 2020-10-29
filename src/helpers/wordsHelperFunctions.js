const filter = async (list, lang) => {
    for (let k = 0; k < list.length; k++) {
        if (list[k].lang.toLowerCase() === lang.toLowerCase()) {
            return list[k];
        }
    }

}
const updateTranslation = async () => {

};
const deleteTranslation = async () => {

};
module.exports = {filter};
