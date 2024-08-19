import { createResource, For } from 'solid-js';
import { GraphQLClient, gql } from 'graphql-request';
import 'tailwindcss/tailwind.css';

const client = new GraphQLClient('https://swapi-graphql.netlify.app/.net  lify/functions/index');

const QUERY = gql`
  query {
    allFilms {
      films {
        title
        releaseDate
        director
        episodeID
      }
    }
  }
`;

const fetchFilms = async () => {
  const data = await client.request(QUERY);
  return data.allFilms.films;
};

const App = () => {
  const [films] = createResource(fetchFilms);

  return (
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Star Wars Films</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <For each={films()}>
          {(film) => (
            <div class="border rounded shadow p-4">
              <h2 class="text-lg font-semibold">{film.title}</h2>
              <p class="text-gray-600">Episode: {film.episodeID}</p>
              <p class="text-gray-600">Director: {film.director}</p>
              <p class="text-gray-600">Release Date: {film.releaseDate}</p>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;