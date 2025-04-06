# **Technical Test - Weather App**  

This project is a technical test for developing a single-page application (SPA) in React.

## **Tech Stack**  
- React (Vite)  
- React Router  
- Typescrit 
- SCSS  
- Vitest & React Testing Library

## **Installation & Setup**  
1. Clone the repository:  
   ```sh
   git clone https://github.com/jutorla/480devFrontTest.git
   cd 480devFrontTest
   ```  
2. Install dependencies:  
   ```sh
   npm install
   ```  
3. Start development server:  
   ```sh
   npm run start
   ```  
4. Build:  
   ```sh
   npm run build
   ```  
5. Run tests:  
   ```sh
   npm run test
   ```  
6. Lint code:  
   ```sh
   npm run lint
   ```  
## **Project Structure**  
```
/src  
 ├── components/      # UI components  
 ├── pages/           # Application views
 ├── constants/       # Constants utils
 ├── utils/           # Api call logic 
 ├── routes/          # Routing configuration  
 ├── hooks/           # Custom Hooks  
 ├── i18n/            # Translation with i18n  
 ├── README.md        # Documentation  
```
## **Deployment**  
Deployment is available on https://four80devfronttest.onrender.com/ and
triggered by GithubActions CD pipeline.

## **LeftOvers**  
Missing specific error api and timeout handling.
Commit message control with husky.
Style looks clunky.