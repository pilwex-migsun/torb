import _ from 'lodash';

class UrbitApi {
  setChannel(ship, channel) {
    this.ship = ship;
    this.channel = channel;
    this.bindPaths = [];

  }

  bind(path, method, ship = this.ship, appl = "torb", success, fail) {
    this.bindPaths = _.uniq([...this.bindPaths, path]);

    window.subscriptionId = this.channel.subscribe(ship, appl, path,
      (err) => {
        fail(err);
      },
      (event) => {
        success({
          data: event,
          from: {
            ship,
            path
          }
        });
      }
      );
  }

  torb(data) {
    this.action("torb", "json", data);
  }

  onionoo(data) {
    this.action("torb", "torb-action", data);
  }

  action(appl, mark, data) {
    return new Promise((resolve, reject) => {
      this.channel.poke(this.ship, appl, mark, data,
        (json) => {
          resolve(json);
        },
        (err) => {
          reject(err);
        });
    });
  }
}
export let api = new UrbitApi();
window.api = api;
