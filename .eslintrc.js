//Com isso estamos usando as regras recomendadas para desenvolvimento Node.js.
module.exports = {
  root: true,
  plugins: ['node'],
  extends: ['plugin:node/recommended', 'prettier'],
  env: {
    node: true
  },
  rules: {  
    'node/no-unpublished-require': 'off'
  }
};

