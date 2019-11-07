import utilsMT from '../../utils-merkle-tree';

// This 'leaf' mapper differs from the 'node' mapper.
export default function({ value, nodeIndex, leafIndex, blockNumber }) {
  // to prevent incorrect leaf data from being stored, we ensure the nodeIndex is calculated correctly from the leafIndex:
  const checkNodeIndex = utilsMT.leafIndexToNodeIndex(leafIndex);
  if (!nodeIndex) {
    nodeIndex = checkNodeIndex; // eslint-disable-line no-param-reassign
    console.log(`Inserting a nodeIndex of ${nodeIndex} for leafIndex ${leafIndex}`);
  } else if (nodeIndex !== checkNodeIndex) {
    throw new Error(
      `Intercepted an incorrect nodeIndex of ${nodeIndex} for leafIndex ${leafIndex}. The nodeIndex should have been ${checkNodeIndex}`,
    );
  }

  return {
    value,
    nodeIndex,
    leafIndex,
    blockNumber,
    isLocked: true, // a leaf is always 'locked' in an append-only tree, because it will never change.
  };
}