module.exports = {
  apps: [
    {
      name: 'delivery-guardian',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 7171',
      cwd: './',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 7171,
      },
    },
  ],
};
