# [TS] Ban Handler

<sup>Supported by <a href="https://github.com/orgs/altv-crc/">CRC</a></sup>

Use events to ban an account, unban an account, or automatically kick users who are banned after login.

## Requires

- [CRC DB](https://github.com/altv-crc/crc-db)
- Login Plugin (Choose 1)
  - [CRC Dicord Login](https://github.com/altv-crc/crc-discord-login)
  - [CRC Login](https://github.com/altv-crc/crc-login)

## Installation

1. Create a folder in your `src` folder called `crc-ban-handler`.

2. Add the `TypeScript` files from this resource, to that folder.

3. Modify `server.toml` and ensure it loads whatever you named the folder.

In the case of the example above it should be `crc-ban-handler`.

```
resources = [ 
    'crc-db',
    'crc-native-menu',
    'crc-instructional-buttons',
    'crc-ban-handler',
    'crc-discord-login',
    'crc-select-character'
    'watch-resources'
]
```

_Your resource structure may vary_

## Setup

Modify `server.toml` and ensure it loads whatever you named the folder.

In the case of the example above it should be `crc-db`.

```
resources = [ 
    'mods-before-db',
    'crc-db',
    'resources-after-db',
    'dbg_reconnect'
]
```
## Developers

You can modify the ban status of an account through MongoDB.

However, if you wish to do it programatically there are three events.

### crc-ban-handler-update

Listen for ban status updates after calling other events.

```ts
alt.on('crc-ban-handler-on-update', (_id: string, isBanned: boolean) => {
    alt.log(`Ban Status Update: ${_id} is ${isBanned ? 'Banned' : 'Unbanned'}`);
});
```

### crc-ban-handler-set-banned

Set a `player` or `_id` from an `Account` as banned.

```ts
alt.emit('crc-ban-handler-set-banned', somePlayerOrAccountID)
```

### crc-ban-handler-set-unbanned

Set an `_id` from an `Account` as banned.

```ts
alt.emit('crc-ban-handler-set-unbanned', accountID)
```