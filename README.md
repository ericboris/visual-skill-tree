# Visual Skill Tree

## Description
The Visual Skill Tree is an interactive visualization tool built using D3.js. It displays skills as nodes in a tree-like structure, connecting them based on progression pathways. Each node is color-coded and labeled with the skill name. The layout uses D3's force simulation to position the nodes and links effectively, providing an intuitive view of the relationships between skills.

## Running the Code

1. **Local Development**:
   
   To run the Visual Skill Tree on your local machine, you'll need to serve the files using a local server. Here are a couple of methods:

   - **Python HTTP Server**:
     
     If you have Python installed, navigate to the project directory in your terminal and use its built-in HTTP server:
     ```bash
     # For Python 2.x
     python -m SimpleHTTPServer 8000

     # For Python 3.x
     python -m http.server 8000
     ```

   - **Node.js http-server**:
     
     If you have Node.js and npm installed, you can use the `http-server` package. First, install it globally:
     ```bash
     npm install http-server -g
     ```

     Then, navigate to the project directory in your terminal and run:
     ```bash
     http-server
     ```

   After starting the server, open your browser and navigate to `http://localhost:8000` to view the project.

2. **Deployment**:

   To deploy the Visual Skill Tree to a live environment, you can use platforms like GitHub Pages, Netlify, or Vercel. Follow the documentation provided by these platforms to deploy static websites.
