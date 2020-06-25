module.exports = {
    truncate: (str, len) => {
        if (str.length < len) {
            return str
        } else {
            str = str.substring(0, len) + "..."
            return str
        }
    }
}