const filter = async (list, lang) => {
    for (let k = 0; k < list.length; k++) {
        if (list[k].lang === lang) {
            return list[k];
        }
    }

}

module.exports = {filter};
