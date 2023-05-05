const API_URL = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

const getDolarValues = async () => {
  const data = await fetch(API_URL);
  const res = await data.json();
  return await res;
};

(async function () {
  console.log('dolarGlobalValues', await getDolarValues());
})();
