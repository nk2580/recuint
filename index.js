const path = require("path");
const exec = require("child_process").exec;
const shell = require("shelljs");

const package = opts => {
  const directory = path.resolve(
    process.cwd(),
    (opts && opts.root) || process.cwd()
  );

  return shell
    .find(directory)
    .filter(item => !item.includes("node_modules"))
    .filter(item => item.includes("package.json"))
    .map(item => item.replace("package.json", ""));
};

const run = (manager, path, cmd) => {
  return new Promise((resolve, reject) => {
    const tool = manager === "npm" ? "npm" : "yarn";
    const command = `${tool} ${cmd}`;
    shell.cd(path);
    exec(command, (err, out) => {
      if (err) reject({ err, path });
      resolve(path+"\n"+out);
    });
  });
};

const manager = opts => {
  return (
    (opts && opts.manager) ||
    (shell.which("yarn") ? "yarn" : shell.which("npm") ? "npm" : false)
  );
};

const recuint = opts => {
  const { command = "install" } = opts;
  return new Promise((resolve, reject) => {
    Promise.all(
      package(opts).map(item => {
        return run(manager(opts), item, command);
      })
    )
      .then(outputs => {
        resolve(outputs);
      })
      .catch(e => {
        reject(e);
      });
  });
};

module.exports = {
  recuint
};
