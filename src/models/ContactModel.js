const mongoose = require('mongoose');
const validator = require('validator');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    created: { type: Date, default: Date.now }
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}

// verificar se faz conflito nome da função
Contact.findById = async function(id) {
    if(typeof id !== 'string') return;
    const user = await ContactModel.findById(id);
    return user;
};

Contact.prototype.register = async function() {
    this.validate();


    if(this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);
};

Contact.prototype.validate = function() {
    this.cleanUp();

    // Validate
    // Email must be valid
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail.');
    if(!this.body.name) this.errors.push('Name is a required field.');
    if(!this.body.email && !this.body.phone) {
        this.errors.push('At least one contact has to be sent: e-mail or phone.');
    }
};

Contact.prototype.cleanUp = function() {
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        name: this.body.name,
        lastName: this.body.lastName,
        email: this.body.email,
        phone: this.body.phone
    };
};

Contact.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.validate();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new:true });
}

module.exports = Contact;