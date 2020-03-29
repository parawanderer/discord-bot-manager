class InputValidator {

    static discordIdRegex = /^[0-9]{18}$/;

    static isDiscordID(string) {
        return !!string.match(this.discordIdRegex);
    }
}

export default InputValidator;