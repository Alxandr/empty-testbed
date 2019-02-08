const { events, Job } = require('brigadier');

events.on('exec', function(e, project) {
  console.log('===> Building ' + project.repo.cloneURL + ' ' + e.commit);

  var node = new Job('node-runner');
  node.image = 'node:11';
  node.tasks = ['cd /src/hello', 'npm install', 'node index.js'];
  node.env = {
    unused: 'myval',
    unused2: project.secrets.dbPassword || 'empty',
  };
  node.run();
});
