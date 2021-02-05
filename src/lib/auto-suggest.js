/**
 * Function to return a list of suggested genes
 */
function getSuggestions(value, list) {
  const inputValue = value.trim().toUpperCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : list.filter((gene) =>
    gene.toUpperCase().slice(0, inputLength) === inputValue
  );
}

/**
 * Function to return the selected gene value
 */
export function getSuggestionValue(suggestion) {
  return suggestion;
}

/**
 * Function to render a given gene in the suggested list
 */
export function renderSuggestion(suggestion) {
  return (
    <span className="suggestion-list-item">
      {suggestion}
    </span>
  );
}

export default getSuggestions;
