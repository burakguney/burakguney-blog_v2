module.exports = {
    paginate: (options) => {

        let outputHTML = ""

        if (options.hash.current === 1) {
            outputHTML += `<li class="page-item disabled"><a class="page-link text-dark"> << </a></li>`
        } else {
            outputHTML += `<li class="page-item"><a class="page-link text-dark" href="?page=1"> << </a></li>`
        }

        let i = (Number(options.hash.current) > 5 ? Number(options.hash.current) - 3 : 1)

        if (i !== 1) {
            outputHTML += `<li class="page-item disabled"><a class="page-link text-dark">...</a></li>`
        }

        for (; i <= (Number(options.hash.current) + 3) && i <= options.hash.pages; i++) {

            if (i === options.hash.current) {
                outputHTML += `<li class="page-item active"><a class="page-link">${i}</a></li>`
            } else {
                outputHTML += `<li class="page-item"><a class="page-link text-dark" href="?page=${i}">${i}</a></li>`
            }

            if (i == Number(options.hash.current) + 3 && i < options.hash.pages) {
                outputHTML += `<li class="page-item disabled"><a class="page-link text-dark">...</a></li>`
            }

        }

        if (options.hash.current == options.hash.pages) {
            outputHTML += `<li class="page-item disabled"><a class="page-link text-dark">>></a></li>`
        } else {
            outputHTML += `<li class="page-item"><a class="page-link text-dark" href="?page=${options.hash.pages}">>></a></li>`
        }

        return outputHTML
    }
}