import TrackerApp from './tracker-app';

/**
 * Integration Layer for TrackerApp
 * @extends TrackerApp
 */

export default class TrackerAppConnected extends TrackerApp {
  async getAllCountry() {
    this.loading = true;
    const fetchUrl =
      'https://corona-virus-world-and-india-data.p.rapidapi.com/api';
    const fetchProps = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com',
        'x-rapidapi-key': '619e879091mshb6e5c701830dbc5p17ac20jsn80e25a402c05',
      },
    };

    try {
      const response = await fetch(fetchUrl, fetchProps);
      const resJson = await response.json();
      this.allResults = resJson.countries_stat;
      this.filteredResults = this.allResults;
      this.loading = false;
    } catch (error) {
      this.loader = false;
      console.log(error.message);
    }
  }
}

customElements.define('tracker-app-connected', TrackerAppConnected);
