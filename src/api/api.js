
export async function fetchPokemons(url = 'https://pokeapi.co/api/v2/pokemon') {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("API response data:", data);
      return { next: data.next, results: data.results };
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return { next: "", results: [] };
    }
  }