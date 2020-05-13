const requireLogin = require('../middlewares/requireLogin');
const { AdminEndpoint, 
    ConfigEndpoint, 
    FilterEndpoint, 
    GuildEndpoint, 
    ImmortalEndpoint, 
    MemberEndpoint,
    PunishmentTypesEndpint,
    PunishmentsEndpoint,
    RulesEndpoint } = require('../services/bot-api');

const SessionExpirer = require('../middlewares/SessionExpirer');
const HTTPErrorHandler = require('../services/HTTPErrorHandler');

module.exports = (app) => {


    /* ============== GUILD ============== */

    app.get('/api/guild', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await GuildEndpoint.getGuildInfo();
        if (HTTPErrorHandler.isError(internalResponse)) {
            return res.status(internalResponse.status).send(internalResponse.data); //
        }
        res.send(internalResponse);
    });

    app.get('/api/guild/roles', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await GuildEndpoint.getGuildRoleInfo();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    /* ============== MEMBERS ============== */

    app.get('/api/members', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await MemberEndpoint.getAll();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.get('/api/members/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await MemberEndpoint.get(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.get('/api/members/:id/roles', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await MemberEndpoint.getRoles(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.post('/api/members/:id/roles', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await MemberEndpoint.addRoleToMember(req.params.id, req.body.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.delete('/api/members/:id/roles', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await MemberEndpoint.removeRoleFromMember(req.params.id, req.body.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    /* ============== FILTER ============== */

    
    app.get('/api/filter/words', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await FilterEndpoint.getAllWords();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.get('/api/filter/words/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await FilterEndpoint.getWord(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.post('/api/filter/words', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await FilterEndpoint.addWord(req.body.type, req.body.data);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.delete('/api/filter/words/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await FilterEndpoint.deleteWord(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    app.put('/api/filter/words/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await FilterEndpoint.updateWord(req.params.id, req.body.type, req.body.data);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });




    app.get('/api/filter/links', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await FilterEndpoint.getAllLinks();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.get('/api/filter/links/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await FilterEndpoint.getLink(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    app.post('/api/filter/links', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await FilterEndpoint.addLink(req.body);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.delete('/api/filter/links/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await FilterEndpoint.deleteLink(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.put('/api/filter/links/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await FilterEndpoint.updateLink(req.params.id, req.body);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });



    /* ============== IMMORTAL ============== */

    app.get('/api/immortal', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await ImmortalEndpoint.getAll();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.get('/api/immortal/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await ImmortalEndpoint.get(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.delete('/api/immortal/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await ImmortalEndpoint.remove(req.params.id, req.body.removeLink);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    /* ============== PUNISHMENTS ============== */


    app.get('/api/punish/history', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentsEndpoint.getRecentPunishments();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    app.post('/api/punish/history/search', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentsEndpoint.searchRecentPunishments(req.body);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.get('/api/punish/history/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentsEndpoint.getPunishmentHistoryForUser(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.put('/api/punish/history/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentsEndpoint.modifyPunishmentStatusForUser(req.params.id, req.body.action);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.get('/api/punish/punishment/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentsEndpoint.getPunishment(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.delete('/api/punish/punishment/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentsEndpoint.wipePunishment(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    /* ============== PUNISHMENT TYPES ============== */


    app.get('/api/punish/types', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentTypesEndpint.getAll();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.get('/api/punish/types/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentTypesEndpint.get(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.delete('/api/punish/types/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentTypesEndpint.delete(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    app.put('/api/punish/types/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentTypesEndpint.update(req.params.id, req.body);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    app.post('/api/punish/types', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await PunishmentTypesEndpint.addNew(req.body);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    /* ============== CONFIG ============== */

    app.get('/api/config/main', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await ConfigEndpoint.getMain();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.get('/api/config/data', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await ConfigEndpoint.getData();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.put('/api/config/main', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await ConfigEndpoint.updateMain(req.body);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    app.put('/api/config/data', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await ConfigEndpoint.updateData(req.body);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    /* ============== ADMIN ============== */

    app.get('/api/admin', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await AdminEndpoint.getAll();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.get('/api/admin/:id', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await AdminEndpoint.get(req.params.id);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.delete('/api/admin/:id', 
    requireLogin,
    async (req, res) => {
        const response = await AdminEndpoint.remove(req.params.id);

        if (HTTPErrorHandler.isError(response)) {
			return res.status(response.status).send(response.data);
        }
        
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
        const internalResponse = await AdminEndpoint.add(req.body.userID, req.body.addedByID, req.body.addedByName);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


    /* ============== RULES ============== */

    app.get('/api/rules', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await RulesEndpoint.get();
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });

    app.put('/api/rules', 
    requireLogin,
    async (req, res) => {
        const internalResponse = await RulesEndpoint.update(req.body);
		if (HTTPErrorHandler.isError(internalResponse)) {
			return res.status(internalResponse.status).send(internalResponse.data);
		}
		res.send(internalResponse);
    });


};