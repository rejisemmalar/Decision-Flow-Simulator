export const addNode = (tree, parentId, newNode) => {
  if (tree.id === parentId) {
    return { ...tree, children: [...tree.children, newNode] };
  }

  return {
    ...tree,
    children: tree.children.map((child) =>
      addNode(child, parentId, newNode)
    )
  };
};

export const updateNode = (tree, nodeId, text) => {
  if (tree.id === nodeId) {
    return { ...tree, text };
  }

  return {
    ...tree,
    children: tree.children.map((child) =>
      updateNode(child, nodeId, text)
    )
  };
};

export const deleteNode = (tree, nodeId) => {
  return {
    ...tree,
    children: tree.children
      .filter((child) => child.id !== nodeId)
      .map((child) => deleteNode(child, nodeId))
  };
};
