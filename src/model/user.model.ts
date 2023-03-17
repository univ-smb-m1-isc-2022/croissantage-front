import GuildModel from "./guild.model";

export default class UserModel {
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Attributes /////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////
    readonly id: number = -1;

    readonly userId: string = '';

    readonly username: string = '';

    readonly avatar: string = '';

    readonly discriminator: string = '';

    readonly locale: string = '';

    readonly guilds: Set<GuildModel> = new Set<GuildModel>();

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Constructors ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////
    public constructor(user?: any) {
        if (!user) return;
        const { id, userId, username, avatar, discriminator, locale, guilds } = user;
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.avatar = avatar;
        this.discriminator = discriminator;
        this.locale = locale;
        this.guilds = guilds;
    }
}