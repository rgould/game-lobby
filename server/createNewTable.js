import { Meteor } from 'meteor/meteor'
import { Tables } from '../imports/api/tables.js';
import { HTTP } from 'meteor/http'

Meteor.methods( {
  initializeTable(table_id) {
    var table = Tables.findOne(table_id);

    /*
     * 1) Notify gameserver to create a new game using player1 and player2
     *  games.heroku.com/guerrilla-checkers/new?role1=gavorkian&role2=kefka
     */

    /*
     * 1.1) make a request to game server
     * 1.2) parse response:
     *      * check for error
     *      * get remote_game_id and save it to the table
     */
    // TODO un-hardcode URL
    const new_game_url = "http://localhost:4321/"+table.game+"/new?fmt=json";
    const data = { role1: table.players[0], role2: table.players[1] };
    //Send message to game server (eg. Guerrilla Checkers) to setup game
    HTTP.call('POST', new_game_url, { data: data }, (error, result) => {
      if (error) {
        throw error;
      }
      if (/ERROR/.test(result.content)) {
        throw result.content;
      }
      const game_id = result.data.glst.game.gid;
      Tables.update(
          { _id: table_id },
          { $set: { remote_game_id: game_id } });
    });


    /*
     * 2) Gameserver will authenticate with user database server (this lobby)
     * 3) Gameserver will tell us which players are active
     * 4) Active players can then play their turns
     *    by going to the /play URL, eg:
     *      http://games.heroku.com/guerrilla-checkers/play?game_id=FOO
     */
  }
})
