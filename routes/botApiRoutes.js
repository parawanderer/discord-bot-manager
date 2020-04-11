const requireLogin = require('../middlewares/requireLogin');
const { AdminEndpoint, 
    ConfigEndpoint, 
    FilterEndpoint, 
    GuildEndpoint, 
    ImmortalEndpoint, 
    MemberEndpoint,
    PunishmentTypesEndpint,
    PunishmentsEndpoint,
    RulesEndpoint } = require('../services/bot_api');

const SessionExpirer = require('../middlewares/SessionExpirer');

module.exports = (app) => {


    /* ============== GUILD ============== */

    app.get('/api/guild', 
    requireLogin,
    async (req, res) => {
        res.send(await GuildEndpoint.getGuildInfo());
    });

    app.get('/api/guild/roles', 
    requireLogin,
    async (req, res) => {
        res.send(await GuildEndpoint.getGuildRoleInfo());
    });


    /* ============== MEMBERS ============== */

    app.get('/api/members', 
    requireLogin,
    async (req, res) => {
        res.send(await MemberEndpoint.getAll());
    });

    app.get('/api/members/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await MemberEndpoint.get(req.params.id));
    });

    app.get('/api/members/:id/roles', 
    requireLogin,
    async (req, res) => {
        res.send(await MemberEndpoint.getRoles(req.params.id));
    });

    app.post('/api/members/:id/roles', 
    requireLogin,
    async (req, res) => {
        res.send(await MemberEndpoint.addRoleToMember(req.params.id, req.body.id));
    });

    app.delete('/api/members/:id/roles', 
    requireLogin,
    async (req, res) => {
        res.send(await MemberEndpoint.removeRoleFromMember(req.params.id, req.body.id));
    });


    /* ============== FILTER ============== */

    
    app.get('/api/filter/words', 
    requireLogin,
    async (req, res) => {
        res.send(await FilterEndpoint.getAllWords());
    });

    app.get('/api/filter/words/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await FilterEndpoint.getWord(req.params.id));
    });

    app.post('/api/filter/words', 
    requireLogin,
    async (req, res) => {
        res.send(await FilterEndpoint.addWord(req.body.type, req.body.data));
    });

    app.delete('/api/filter/words/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await FilterEndpoint.deleteWord(req.params.id));
    });


    app.put('/api/filter/words/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await FilterEndpoint.updateWord(req.params.id, req.body.type, req.body.data));
    });




    app.get('/api/filter/links', 
    requireLogin,
    async (req, res) => {
        res.send(await FilterEndpoint.getAllLinks());
    });

    app.get('/api/filter/links/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await FilterEndpoint.getLink(req.params.id));
    });


    app.post('/api/filter/links', 
    requireLogin,
    async (req, res) => {
        res.send(await FilterEndpoint.addLink(req.body));
    });

    app.delete('/api/filter/links/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await FilterEndpoint.deleteLink(req.params.id));
    });

    app.put('/api/filter/links/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await FilterEndpoint.updateLink(req.params.id, req.body));
    });



    /* ============== IMMORTAL ============== */

    app.get('/api/immortal', 
    requireLogin,
    async (req, res) => {
        res.send(await ImmortalEndpoint.getAll());
    });

    app.get('/api/immortal/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await ImmortalEndpoint.get(req.params.id));
    });

    app.delete('/api/immortal/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await ImmortalEndpoint.remove(req.params.id, req.body.removeLink));
    });


    /* ============== PUNISHMENTS ============== */


    app.get('/api/punish/history', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentsEndpoint.getRecentPunishments());
    });


    app.post('/api/punish/history/search', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentsEndpoint.searchRecentPunishments(req.body));
    });

    app.get('/api/punish/history/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentsEndpoint.getPunishmentHistoryForUser(req.params.id));
    });

    app.put('/api/punish/history/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentsEndpoint.modifyPunishmentStatusForUser(req.params.id, req.body.action));
    });

    app.get('/api/punish/punishment/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentsEndpoint.getPunishment(req.params.id));
    });

    app.delete('/api/punish/punishment/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentsEndpoint.wipePunishment(req.params.id));
    });


    /* ============== PUNISHMENT TYPES ============== */


    app.get('/api/punish/types', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentTypesEndpint.getAll());
    });

    app.get('/api/punish/types/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentTypesEndpint.get(req.params.id));
    });

    app.delete('/api/punish/types/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentTypesEndpint.delete(req.params.id));
    });


    app.put('/api/punish/types/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentTypesEndpint.update(req.params.id, req.body));
    });


    app.post('/api/punish/types', 
    requireLogin,
    async (req, res) => {
        res.send(await PunishmentTypesEndpint.addNew(req.body));
    });


    /* ============== CONFIG ============== */

    app.get('/api/config/main', 
    requireLogin,
    async (req, res) => {
        res.send(await ConfigEndpoint.getMain());
    });

    app.get('/api/config/data', 
    requireLogin,
    async (req, res) => {
        res.send(await ConfigEndpoint.getData());
    });

    app.put('/api/config/main', 
    requireLogin,
    async (req, res) => {
        res.send(await ConfigEndpoint.updateMain(req.body));
    });


    app.put('/api/config/data', 
    requireLogin,
    async (req, res) => {
        res.send(await ConfigEndpoint.updateData(req.body));
    });


    /* ============== ADMIN ============== */

    app.get('/api/admin', 
    requireLogin,
    async (req, res) => {
        res.send(await AdminEndpoint.getAll());
    });

    app.get('/api/admin/:id', 
    requireLogin,
    async (req, res) => {
        res.send(await AdminEndpoint.get(req.params.id));
    });

    app.delete('/api/admin/:id', 
    requireLogin,
    async (req, res) => {
        const response = await AdminEndpoint.remove(req.params.id);
        
        // Additional Handling!! If we remove an admin we need to make sure their session gets expired 
        // (so that they can't log in or carry out actions anymore if they still have their session set up). 
        if (response.userId) {
            SessionExpirer.markForExpiry(response.userId);
        }

        res.send(response);
    });


    app.post('/api/admin', 
    requireLogin,
    async (req, res) => {
        res.send(await AdminEndpoint.add(req.body.userID, req.body.addedByID, req.body.addedByName));
    });


    /* ============== RULES ============== */

    app.get('/api/rules', 
    requireLogin,
    async (req, res) => {
        res.send(await RulesEndpoint.get());
    });

    app.put('/api/rules', 
    requireLogin,
    async (req, res) => {
        res.send(await RulesEndpoint.update(req.body));
    });


};