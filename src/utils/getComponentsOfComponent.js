
function getComponentsOfComponent(component) {
  const res = [];
  if (component.components) {
    for (const c of Object.values(component.components)) res.push(getComponentsOfComponent(c));
  }
  res.push(component);
  return res.flat();
}

module.exports =  {
  getComponentsOfComponent,
};
