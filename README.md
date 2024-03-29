# Treasure-Places [![Netlify Status](https://api.netlify.com/api/v1/badges/80684a92-729e-4f63-b3d1-3692136cabce/deploy-status)](https://app.netlify.com/sites/treasure-places/deploys)

<div align="center">
  <a>
    <img src="https://cdn-icons-png.flaticon.com/64/3953/3953880.png" alt="favourite" />
  </a>

<h4 align="center">Share your favourite places with others built with MERN-stack</h4>

  <p align="center">
    <a href="https://treasure-places.netlify.app/">View Deployment</a>
    ·
    <a href="https://github.com/Im-Abhi/Treasure-Places/issues">Report Bug</a>
  </p>
</div>

## About the app

- The main goal of this app is to help users to share their favourite places with others.
- The app uses [Google Maps API](https://developers.google.com/maps/apis-by-platform) to get the loaction of places entered by users.
- Google Maps API provides google maps which can be embedded in the website with target location and we can also extract the geo-coordinates of the location.

## Design

- It is possible that you may find the UI not that soothing.
- It is made as minimal as possible with css only no external library used for styling it.

<p align="center">
<img src="https://user-images.githubusercontent.com/86161191/184145492-71c16ced-8ea7-42a0-821e-78e4c089e6dc.png" width="90%"/>
</p>
<!--
![image](https://user-images.githubusercontent.com/86161191/184145492-71c16ced-8ea7-42a0-821e-78e4c089e6dc.png)
-->

## Built With 🛠

- [![MongoDB][mongodb]][mongodb-url]
- [![Express][express.js]][express-url]
- [![React][react.js]][react-url]
- [![Node][node.js]][node-url]

[express.js]: https://img.shields.io/badge/express.js-cb776d?style=for-the-badge&logo=express&logoColor=white
[express-url]: http://expressjs.com/
[node.js]: https://img.shields.io/badge/node.js-9bc148?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/en/
[mongodb]: https://img.shields.io/badge/mongodb-52584a?style=for-the-badge&logo=mongodb&logoColor=389c44
[mongodb-url]: https://www.mongodb.com/
[react.js]: https://img.shields.io/badge/React-276191?style=for-the-badge&logo=react&logoColor=65cbe9
[react-url]: https://reactjs.org/

## About MERN-Stack

MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

- MongoDB - document database
- Express(.js) - Node.js web framework
- React(.js) - a client-side JavaScript framework
- Node(.js) - the premier JavaScript web server

Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js the popular and powerful JavaScript server platform. Regardless of which variant you choose, ME(RVA)N is the ideal approach to working with JavaScript and JSON, all the way through.

## Setup

1. Fork and clone the repository locally.
2. Navigate to the cloned folder
3. Download the latest version of [Node.js](https://nodejs.org/en/download/) for your OS
4. Install [yarn](https://yarnpkg.com/) globally with the command

```
npm install yarn --global
```

4. Starting the frontend client

```
cd frontend
yarn install
yarn start
```

5. Inside backend folder create a new file named `.env` which will hold the environment variables
![image](https://user-images.githubusercontent.com/86161191/184349365-df72fbe2-bfc6-49a9-8173-70e02253dcf8.png)
here 
- MONGO_URI -> the mongodb cloud database url.
- JWT_SECRET_KEY -> the string secret used in creating the jwt tokens.
- API_KEY -> Google maps api key

6. Starting the backend server

```
cd backend
yarn install
yarn start
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement" or "feature".
Don't forget to give the project a star!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- ROADMAP -->
## Roadmap

- [ ] Change image uploads from local to some cloud storage.

<!--
See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>
-->



## License

This application is released under MIT License for fair use (see [License](https://github.com/im-abhi/Clouddy/blob/master/LICENSE)).
