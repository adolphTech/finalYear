const hbs = require("hbs");

const pillFunction = () => {
    hbs.registerHelper('ifStatus', function(status, options) {
        if (status === 'cancelled') {
            return new hbs.SafeString(`<span class="badge rounded-pill bg-danger">${status}</span>`);
        } else if (status === 'done') {
            return new hbs.SafeString(`<span class="badge rounded-pill bg-info">${status}</span>`);
        } else if (status === 'pending') {
            return new hbs.SafeString(`<span class="badge rounded-pill bg-success">${status}</span>`);
        } else if (status === 'requested') {
            return new hbs.SafeString(`<span class="badge rounded-pill bg-primary">${status}</span>`);
        } else {
            return new hbs.SafeString(`<span class="badge rounded-pill bg-warning">${status}</span>`);
        }
    });
}


const sidebarFunction = () => {



}

module.exports = { pillFunction }