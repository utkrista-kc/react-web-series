# Episode 2: Igniting Our App

1. We do not want to push comments, console.log into our product. So, we have to perform minification, bundling, code splitting, chunking, etc. Instead of using already built in this engineering, we will build production ready app. React will itself not do the production ready. 

2. NPM is everything but does not stand for Node Package Manager. It does not have a full form. It manages packages but not a Node Package Manager. It is a standard repository where all the packages are hosted there.

3. Package.json is a configuration for NPM. Packages are also known as dependencies. It keeps track of all the dependencies installed into our project. It keeps track of what version of dependencies installed into our system.

Package-lock.json keeps track of exact version installed while package.json can have caret or tilde. Package.json have approx version while package-lock.json has exact version. Package-lock.json has some keys as integrity or hashing, it is used to keep track what is in my machine is the same thing on production.

4. Most important package is a bundler. Our whole code need to be cleaned, compressed, minified, so we need bundler. Webpack, parcel are bundlers. Create reawct app uses webpack and babel behind. At the end all the bundlers do the same although they do it differently. We will be using parcel in our application. Parcel comes as node package. 

5. There are two types of dependencies in our project. Dev dependencies are used in our development environment, normal dependencies are used in production. 

6. ^ - caret: Package will be automatically upgraded with minor updates when new version is released. "Compatible with version", updates all future minor/patch versions without incrementing the major version. The caret allows changes that do not modify the left-most non-zero digit in the version. It is often used to specify a range of compatible versions while ensuring that only backward-compatible updates are allowed. For example, if your dependency is specified as "^1.2.3", it means any version from 1.2.3 up to, but not including, 2.0.0 is acceptable. It allows for bug fixes and new features but avoids breaking changes. It will update all future Minor andpatch updates.
~  tilde: It will update you to all future patch versions, without incrementing the minor version. ~1.2.3 will use releases from 1.2.3 to <1.3. "Approximately equivalent version", It matches the most recent patch version. It freezes major and minor version. 

Package will be automatically upgraded with major updated when new version released. Caret is acceptable as it updates the minor updates but when we use tilde a lot of issues might occur. It will update all the future patch versions without incrementing the minor version.
Version: Major.Minor.Patch.
Given a version 1.2.3, 1 refers to major version (incompatible API changes or major features), 2 refers to backward-compatible new features or enhancementes, 3 refers to patch version ( backward compativle bug fixes or patches)

7. When we install some package, we get node_modules but there can be other packages installed with it which we have not specified for it to install. It is because of the transitive dependency. The package we are trying to install can depend on a lot of other dependencies. Our project does not only have single package.json and package-lock.json. Every dependency will have its own package.json. Each dependency will maintain its own package.json. So, due to these other dependencies are installed. So, our node_modules is huge. Node modules should not be pushed to the production. Package.json and package-lock.json needs to be pushed to git because they maintain the dependencies of the project. Most of us do mistake by not putting package-lock.json into git. We can recreate node modules with package.json and package-lock.json.

8. npx parcel index.html - command to install parcel. It creates server where our page is hosted. npx means executing a package where npm installs package. 

9. CDN links import is not a good way to import React to the project like we did in the first episode. It will make a network call to the site. Suppose, if we have react into our node modules, we need not make network calls. Also, if the newer versions of React comes, we need to keep changing the CDN URLS. So, it is better to have it in our package.json.
npm i react , npm i react-dom - installation commands
import React from "react";
import ReactDOM from "react-dom";
We got error that @parcel/transformer-js: Browser scripts cannot have imports or exports. It is because we have imported App.js 
``` <script src="./App.js"> ```. But this App.js is not a normal javascript file. The error mentions that it cannot understand import statements.  Browser script or normal script cannot have import. So, we need to tell that this imported file is not normal JS file but a module.
``` <script type="module" src="./App.js">```
Now, it is considered a module. 

10. Parcel created dev build, created local server, HMR (Hot Module Replacement, any changes updated immediately.) Parcel uses file watching algorithm written in C++ such that it keeps track of all the files and if any changes detected the project gets re-build and updated. Parcel also provides faster builds through caching (as the built in .. time reduces everytime.). Parcel also does the image optimization. Parcel also performs bundling and compress the file. It also performs consistent hashing and code splitting. Along with it, it does differential bundling (to support older browsers). Parcel provides better error handling. Likewise, it also provides a way to run server in HTTPs. It is a zero config tool. Parcel also has tree shaking (removing unused code). Parcel creates different dev and production bundles. Parcel automatically gives browser list for browser compatibility

```npx parcel build index.html```
In package.json, we have  "main": "App.js", but in parcel we have given entry point index.html so we get error when we use the above command because of conflict. So, we have to remove the line. It creates 3 main files html, css and js files. Other files .map files are just other files for mapping. 

For development build use ```npx parcel index.html```
So, dist folder, .parcel-cache need not be pushed to the github as it can be regenerated.

11. To make our project compatible with older version of browsers, we can use browserlist. We have to install npm package browserslist. When we specify values in browserslist, it denotes that it definitely works on the given versions but it might or might not work on other web versions. Browserlist help us to make our app compatible for older versions of browser.
We can add this in order to make our project work on last 2 versions. 
```
"browserslist": [
"last 2 versions"
]
```

# Theory Assignment:

1. What is `NPM`?
It is a open source package manager for your project. It is world's largest software registry. It has 3 components.
a) website - One can search for packages.
b) CLI - It runs from terminal.
c) registry - It is large public database of JS software.


2. What is `Parcel/Webpack`? Why do we need it?
Parcel/Webpack are the bundlers that are needed to clean, minify, compress, etc our code so that our project is ready for production deployment. They take our code, bundle it into smaller, peformance efficient files in minified form. It helps reduce latency of code execution and also optimize our app for web.

> Difference between parcel and webpack
    Parcel doesnot need any external configuration file but webpack requires a separate config file to specify plugins, output and entry loaders.
    Parcel uses tree shaking to improve the performance of application. Webpack default doesnot have such but can be configured with additional plugin.
    Parcel doesot have provision of code-splitting but webpack has provision of lazy loading using code splitting.
    Parcel has default hot  module replacement but webpack needs additional plugin to configure for HMR.


3. What is `.parcel-cache`
in parcel v2, it is named as .parcel-cache but before that  it was named .cache. It stores information when parcel builds your project so when it rebuilds everything in our code need not be re-analyzed or re-parsed. With this feature, parcel is fast in development mode. Commiting it to git repository is a bad idea because, it would have large number of unnecessary changes to the commit history.

4. What is `npx` ?
It is basically NPM package runner. It allows to run a command from local or remote npm package as similar as using npm run.
It allows developers to run any package available in NPM registry without even installing it. Npx doesnot install packages so package pollution in machine is not found. 

5.  What is difference between `dependencies` vs `devDependencies`
Dependencies are the packages that are needed to run the project effectively. They are installed transitively.
devDependencies are packages that the developer needs during the development or development envirnonment. They are not installed transitively.

6. What is Tree Shaking?
It is commonly used term in JS for removal of dead code. It relies on analyzing import and export of each module and remove everything that is not used. It is also kown as dead code elimination. Bundler like webpack, parcel automatically remove dead code which is very important for preparing production ready app (minimal file size and minimized structure)

Parcel does it in production build. It supports for both static and dynamic import, common js and es modules and even across languages with css modules. Parcel also concatenates modules to single scope rather than having multiple functions wrapped into modules. It is called scope hoisting. This makes minification more effective. It also improves performance by making references static rather than dynamic lookups.

7. What is Hot Module Replacement?
It improves the development experience by updating the modules at runtime without needing a whole page refresh. The changes are reflected in browser. Parcel HMR support both Js and CSS assets. It helps in retaining application state which gets lost while doing a full page reload. It speeds up development. In production, HMR is disabled.

8. List down your favourite 5 superpowers of Parcel and describe any 3 of them in your own words.
> Minification
It includes minifiers for JS, HTML, SVG, CSS. It reduces size of output bundles (rename variables shorter, remove whitespace etc)

> Tree shaking
It analyze which modules are not in use and remove in production build

> Image Optimization
It support resizing, converting and optimizing images. It also supports lossless image optimization of png and jpeg files by 
default in production mode. It reduces size of images without reducing the quality.

> Hot Module Replacement (HMR)
Updates modules in browser at runtime without needing for a whole page refresh. Css changes are also automatically applied.

> Caching
Parcel caches everything build to its disk. It you restart server, it will only rebuild files that have since last run. The cache is stored in .parcel-cache. To optimize caching and development experience, parcel uses file watcher that is written in    C++ which integrates with low-level file functionality of each operating system.
Based on this, parcel determine which files need to be rebuilt.

> HTTPS
Sometimes we need HTTPS during development. Parcel dev server support HTTPS in dev environment.We can use automatically generated certificate 
or provide own.


9. What is `.gitignore`? What should we add and not add into it?
It is a text file that tells git which files or folders that should be ignored in a project. Files that donot need to be committed should be added to .gitignore. That is those files for whom we donot want to track the changes. Anything that can be recreated in server with the specs provided should be included in gitignore. For example, credentials, file downloaded 
with package managers, os files, language or framework files, etc.


10. What is the difference between `package.json` and `package-lock.json`
package.json includes metadata about the project and functional dependencies required by the application. When package is installed package-lock.json is auto created. It is used for locking the dependency with installed version. To avoid differences in installing dependencies in different environments and to generate same results in all environments, we package-lock.json. When installing package in deployment, the package required by project might have a higher version (^2.0.1 as specified initially) So, if you want the same version to be installed what was used in development, we need package-lock.json and we need to push it into git repository. Using lock files ensure that each installation remain identical for etnire dependency tree, every single time from anywhere. Lock files are intended to lock all verstion for entire dependency tree. Generally, package.json sets minimum version for each dependency.

11. Why should I not modify `package-lock.json`?
It is a generated file and not designed for manually to be edited. It tracks the entire tree of dependencies and exact version of each dependency. It is done by specifying a version, location and integrity hash. Without or modifying package-lock.json can have different installed versions of packages in different environments. So, chances are problems arise in project deployment with this.

12. What is `node_modules` ? Is it a good idea to push that on git?
node_modules contain every installed dependency for your project. It is not a good idea, because as we install more dependencies, the size grows. Not just that, we can reinstall them in our other environments using package.json and package-lock.json and load all the package dependencies of our project.

13. What is the `dist` folder?
It signifies distribution. It is also named as public/ or build/. The files that are meant for production or public use are located here. It contains minimized version of the source code. It is considered good practice to clean dist folder before each build.
Slight difference
build/ : compiled version but not production ready
dist/: production ready compiled, minified version of your code
public/: used as files that run on browser. It can include html, css or server side js

14. What is `browserlists`
It is a tool that allows specifying which browsers should be supported in your frontend app by specifying queries in a config file. It controls the output JS so that emitted code will be compatible with browsers specified.


15. Read about dif bundlers: vite, webpack, parcel.
Webpack:

* Configuration-Heavy: Webpack is a powerful and highly configurable bundler. Its strength lies in its flexibility, but this can also make its configuration more complex, especially for beginners.
* Ecosystem: Webpack has a vast ecosystem of plugins and loaders, allowing developers to customize the build process extensively.
* Code Splitting: Webpack supports efficient code splitting, enabling the creation of smaller bundles that can be loaded on-demand.
Mature and Widely Used: Webpack has been around for a long time and is widely adopted in the industry. It's known for its versatility and ability to handle complex scenarios.

Vite:

* Development Server: Vite is designed for fast development by leveraging native ES module imports. It provides an extremely fast development server that leverages native browser ESM (ECMAScript Modules) for quick module resolution.
Optimized for Vue: While Vite is not limited to Vue.js, it is developed by the same team and is particularly well-optimized for Vue projects.
* Plugin System: Vite has a plugin system that allows for extending and customizing the build process. It's designed to be flexible and extensible.
* Dev-First Approach: Vite prioritizes a great development experience, and it is often used for prototyping and quick iteration during development.

Parcel:

* Zero Configuration: Parcel is known for its zero-configuration setup. It aims to require minimal setup and provides sensible defaults to get developers started quickly.
* Blazing Fast: Parcel is designed for speed, and it achieves this by utilizing parallelization and caching strategies. It is known for its fast build times.
* Limited Configuration: While the zero-configuration approach is convenient, it might be less flexible for complex customization compared to Webpack or Vite.
* Plug-and-Play: Parcel is straightforward to use and requires minimal setup, making it an excellent choice for simple projects or developers who prefer a more plug-and-play experience.

16. Read about Script types in html (MDN Docs)
Value of the script type indicate data represented by script. 
Attribute is not set (default), empty string or JS MIME type. Some MIME types are: 
> importmap: It indicates body of element contains import map (JSON object that developers can use to control how browser resolve module specifiers when importing JS modules.)

> module: Code to be treated as JS module. Processing of script contents is deferred by default. charset and defer attributes have no effect. It requires use of CORS for cross-origin fetching.

> speculationrules: Value indicates body of element contains speculatioin rules. Specularioin rules take form of JSON object to determine what resources should be prefetched or prerendered by the browser. 

> any other value: It is treated as data block and would not be processed by browser. Developers must use valid MIME type that is not a JS MIME type to denote data blocks. All other attributes will be ignored including src.


# Additional

* Bundler
It is a tool that combines all of your code and dependencies into a single file with everything merged known as bundle file.
It is just one .js file converted to another .js file but with minimal setup. Bundling is the process of following or combining all the imports and merging into single file - bundle. This bundle can be included in order to load the entire webpage at once. If used create react app, you will have webpack setup to bundle your app.

* Code splitting
Bundling is great but as the app grows, so does the bundle. So, with large bundle, it takes large amount of time to load the page. So, to avoid ending up with large bundle, we can split our bundle. Code splitting feature is provided by bundlers like webpack, browserfy etc that create multiple bundles and they are dynamically loaded at runtime. Here, code is not reduced but we are just avoiding loading code entire at once. We just load what is needed at initial load. Code splitting helps to lazy load only the things needed by the user. So, will improve the performance. Many ways to achieve: dynamic import(), React.lazy()





