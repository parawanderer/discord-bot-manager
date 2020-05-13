class InputValidator {

    static discordIdRegex = /^[0-9]{18}$/;
    static minecraftUUIDRegex = /^[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}$/;

    static isDiscordID(string) {
        return !!string.match(this.discordIdRegex);
    }

    static stripDashesFromUUID = (uuid) => {
        return uuid.replace(/-/g, '');
    };

    static isValidUUID = (string) => {
        if (typeof string !== typeof "") return false;
        return InputValidator.minecraftUUIDRegex.test(string);
    }
}

export default InputValidator;