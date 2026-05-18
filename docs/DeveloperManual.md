# Developer Manual

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Supabase
- Chart.js
- Vercel

## Installation
- Clone the repository:
```bash
git clone git@github.com:SZYua/INST377-FinalProject.git
```
- Install dependencies:
```bash
npm install
```
- Run the application
```bash
npm start
```
- Application runs locally at:
```txt
http://localhost:3000
```

## Environment Variables
Please create a `.env` file in the root directory and include:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_kay
```

## API Endpoints
### GET /api/searchAnime
Retrieves anime search information from an external anime API (trace.moe API)

### GET /api/history
Retrieves saved anime search history from the database.

### POST /api/saveResult
Saves a new anime search entry to the database

## Front-End libararies
- Chart.js
    - Used for data visualization and analytics charts.
- AOS
    - Used for responsive UI and styling.

## Usage
1. Search for anime scenes or episode information
2. View search results
3. Track search history
4. Explore search analytics through charts

## Known Bugs
- Some charts may not immediately refresh after multiple searches.
- Some anime API responses may occasionally return incomplete data.

## Future Development
Potential future improvements include:
- User authentication system
- Best match/favorite anime saving feature
- Advanced filtering options
- Expanded analytics dashboard
- Implement mobile version

## Deployment
Live Demo:
https://inst-377-final-project-ilck.vercel.app/

## Contributors
- Sharon Zhang