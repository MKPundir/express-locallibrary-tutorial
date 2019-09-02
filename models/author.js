var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

// virtual for date of birth
AuthSchema.virtual('dob').get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('MMMM, Do YYYY') : '';
});

// virtual for date of death
AuthSchema.virtual('dod').get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('MMMM, Do YYYY') : '';
});

// Virtual for Author's full name
AuthSchema.virtual('name').get(function(){
    return this.family_name +","+ this.first_name;
});

// Virtual for Author's age
AuthSchema.virtual('age').get(function(){
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtula for Author's full url
AuthSchema.virtual('url').get(function(){
    return '/catalog/author/'+this._id;
});

// Exporting module
module.exports = mongoose.model('Author',AuthSchema);
