const CronJob = require("cron").CronJob;
const notifications = require("./notifications");
const moment = require("moment");

const scheduler = function() {
  return {
    start: function() {
      new CronJob(
        "0 */5 * * * *",
        function() {
          console.log(
            "Running Send Notifications Worker for " + moment().format()
          );
          notifications.run();
        },
        null,
        true,
        ""
      );
    }
  };
};

module.exports = scheduler();
