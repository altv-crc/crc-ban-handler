import * as alt from 'alt-server';

declare module 'alt-server' {
    interface ICustomEmitEvent {
        /**
         * Set a player or account `_id` as banned
         *
         * @memberof ICustomEmitEvent
         */
        'crc-ban-handler-set-banned': (playerOrAccountID: string | alt.Player, reason: string | undefined) => void;

        /**
         * Unban an account `_id`.
         *
         * @memberof ICustomEmitEvent
         */
        'crc-ban-handler-set-unbanned': (_id: string) => void;

        /**
         * Replies with the account `_id` and what their status was changed to
         *
         * @memberof ICustomEmitEvent
         */
        'crc-ban-handler-on-update': (_id: string, isBanned: boolean) => void;
    }
}
