import * as alt from 'alt-server';
import * as crc from '@stuyk/cross-resource-cache';

// Initialize Database
crc.database.onReady(() => {});

interface Account {
    _id?: string;
    banned: boolean;
    reason: string;
}

const accountMap: { [id: string]: string } = {};

function checkAccountStatus(player: alt.Player, account: Account) {
    const exists = Object.values(accountMap).find((x) => x === account._id);
    if (exists) {
        player.kick('Account is already logged in');
        return;
    }

    if (account && account.banned) {
        player.kick('Banned');
        return;
    }

    accountMap[player.id] = account._id;
}

alt.on('crc-ban-handler-set-banned', async (playerOrId, reason: string = undefined) => {
    let _id: string;

    if (playerOrId instanceof alt.Player) {
        _id = accountMap[playerOrId.id];
        if (reason) {
            playerOrId.kick(reason);
        } else {
            playerOrId.kick('Banned');
        }
    } else {
        _id = playerOrId;
    }

    const data = await crc.database.get<Account>({ _id }, 'accounts');
    if (!data) {
        return;
    }

    await crc.database.update({ _id, banned: true, reason: reason ? reason : null }, 'accounts');
    alt.emit('crc-ban-handler-on-update', _id, true);
});

alt.on('crc-ban-handler-set-unbanned', async (_id) => {
    const data = await crc.database.get<Account>({ _id }, 'accounts');
    if (!data) {
        return;
    }

    await crc.database.update({ _id, banned: false, reason: null }, 'accounts');
    alt.emit('crc-ban-handler-on-update', _id, false);
});

alt.on('crc-login-finish', checkAccountStatus);
alt.on('crc-discord-login-finish', checkAccountStatus);
alt.on('playerDisconnect', (player: alt.Player) => {
    delete accountMap[player.id];
});

