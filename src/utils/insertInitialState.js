
function insertInitialState(state, template, placeholder = '<!-- __INITIAL_STATE__ -->') {
  try {
    if (typeof template !== 'string') template = template.toString();
    if (template.match(/\[object\s(\w)*\]$/gm)) throw new Error('can\'t convert to string');
  } catch (err) {
    throw new Error(err);
  }

  const serializedState = JSON.stringify(state);
  if (!serializedState) throw new Error('serialized state is undefined');

  const stateString = `
    <script>
      window.__INITIAL_STATE__ = ${serializedState}
    </script>
  `;

  return template.replace(placeholder, stateString);
}

module.exports =  {
  insertInitialState,
};
