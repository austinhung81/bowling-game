module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 128],
    'scope-case': [0],
    'subject-case': [0],
  },
};
