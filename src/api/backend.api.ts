import GuildModel from "../model/guild.model";

// const LoginURL = `http://localhost:8081/api`;
const LoginURL = `http://localhost:8080/api`;

const getGuildsByUserId = (id: number, callback: (guilds: GuildModel[]) => void) => {
    fetch(`${LoginURL}/guilds?id=${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            callback(data);
        });
};

const BotInviteURL = `${LoginURL}/guilds/new`;

export { getGuildsByUserId, BotInviteURL };

// export {getGuildsByUserId, BotInviteURL};