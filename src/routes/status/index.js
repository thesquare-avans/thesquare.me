module.exports = {
  path: 'status',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/status'));
    });
  }
};
