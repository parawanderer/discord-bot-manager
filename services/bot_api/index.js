const AdminEndpoint = require('./AdminEndpoint');
const RulesEndpoint = require('./RulesEndpoint');
const ConfigEndpoint = require('./ConfigEndpoint');
const PunishmentTypesEndpint = require('./PunishmentTypesEndpint');
const PunishmentsEndpoint = require('./PunishmentsEndpoint');
const ImmortalEndpoint = require('./ImmortalEndpoint');
const FilterEndpoint = require('./FilterEndpoint');
const MemberEndpoint = require('./MemberEndpoint');
const GuildEndpoint = require('./GuildEndpoint');
const botAPI = require('./axiosPreset');


module.exports = {
    botAPI,
    AdminEndpoint : new AdminEndpoint(),
    RulesEndpoint : new RulesEndpoint(),
    ConfigEndpoint : new ConfigEndpoint(),
    PunishmentTypesEndpint : new PunishmentTypesEndpint(),
    PunishmentsEndpoint : new PunishmentsEndpoint(),
    ImmortalEndpoint : new ImmortalEndpoint(),
    FilterEndpoint: new FilterEndpoint(),
    MemberEndpoint : new MemberEndpoint(),
    GuildEndpoint: new GuildEndpoint()
};