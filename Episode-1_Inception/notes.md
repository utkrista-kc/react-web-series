1. VS Code uses Emmet. It generates code for you. Suppose typing html:5 gives a basic skeleton of html for you. 
2. We can create same h1 header in html using the script tags.

 ``` 
    <script>
        const heading = document.createElement("h1");
        heading.innerHTML = "Hello World from Javascript!";
        const root = document.getElementById("root");
        root.appendChild(heading);
    </script>
   ```
    <script> tags are always placed inside the <head> tags or just before closing the <body> tag in HTML document. JS files are linked in bottom of the body because whenever browser encounters JS, it stops HTML parsing and starts loading and executing the script. If added to top, it would make page rendering slow and it would take long to load page. Not just that DOM would not be fully rendered, JS would not be able to manipulate the elements in DOM.

3. Browser understand keywords like document, innerHTML as they already have a Javascript engine in them. But the browser do not know react or do not understand React. So, one way of adding React to our project is through CDNs. 
```<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>```
This is one way of injecting react to our project. These files contain all Javascript code with functions and variables. React at the end of the day is just Javascript files. So, these files contain React code. Facebook developers have written this code. When we do this, we import the react code. As soon as we injected these files into these project, when we go to browser console and type React, we get React functions or methods that we injected.
We have to always import or inject these files before loading our file with React code.

* Why 2 files used?
 react.development.js - It is core React framework file.
 react-dom.development.j - File useful for React DOM operations. We need it to modify the DOM (Document Object Model). Bridge to connect browser to DOM.
 Also, there are two files instead of a single combined file because React is not only used on browser, we can also use it in React Native that is for mobile applications.

* CDN(Content Delivery Network) is a group of servers that are spread around the world for fast delivery of internet content. Servers in CDN temporarily store or cache webpage content like images, videos, HTML, Javascript. When users load the webpage, they see the cached content. Websites using CDN, 50% reduction in load times. CDN balance load of network traffic. CDN save bandwidth cost as web hosting providers charge in a way the more data is transferred, the greater is the cost. CDN defend well the Denial of Service(DoS) attack.

* Crossorigin
crossorigin attribute in HTML controls how the browser handles loading of external resources such as stylesheets, images, etc when they are hosted on a different domain(origin) than the one serving the webpage. If crossorigin set, resource should be fetched with CORS semantics. CORS is a security feature implemented by web browsers to prevent potentially malicious cross-origin requests. It restricts web pages from making requests to a different domain than the one that served the web page. By default, browsers adhere to the same-origin policy, which means they restrict web pages from making requests to a different domain.
Setting crossorigin to "anonymous" (as it is by default when the attribute is present without a value) means that the browser will make the request without including any credentials (like cookies or HTTP authentication) from the current browsing context. This is suitable for public resources that don't require authentication.
If you set crossorigin to "use-credentials", it indicates that the browser should include credentials when making the request. This is used when you have specific permissions to access resources on another domain, and the server is configured to accept requests with credentials.
If the crossorigin attribute is omitted altogether, or if it is not set to "anonymous" or "use-credentials," the browser will treat the request as a same-origin request, and it will include credentials only if the destination is the same origin.

CORS stands for Cross Origin Resource Sharing. It is a mechanism that allows resources on a webpage to be requested from another domain outside their own domain. A crossorigin request is a request of resource(style sheets, iframes, images, fonts or scripts) from another domain. CORS is used to manage cross-orign requests.The crossorigin attribute sets mode of request to an HTTP CORS Request. It can have values such as anonymous or use-credentials. In anonymous, no credentials are sent. But in use-credentials, credentials such as cookie, certificate, HTTP basic authentication is sent. CORS defines a way how a browser and server interact by determining how safe is to allow cross-origin request. Opposite of cross-origin request is same-origin request. It means the documents on the same server or same origin can only interact with each other.


4. We can create h1 elements in react using <script> tages.
 <script>
        const heading  = React.createElement("h1", {id ="heading", xyz="abc"}, "Hello World from React!") This comes from core React functions and takes 3 arguments unlike Javascript. First one is element name, second is object and third one is the content in that element. 
        
        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(heading);
        Likewise, we have to specify root in react. But this is done by the ReactDOM. And finally we render the root created.
</script>

At the end, React uses Javascript. The most costly operation is to add or remove elements from the DOM. So, React also comes up with handy functions in order to optimize the DOM manipulation. 
In order to keep React code in a separate file, we created App.js and moved React code to a different file.
{} in the above heading line, it is used to give attribute to the element. Suppose, we might give some id, class name and many more. We can also give any other attributes names such as xyz. 

console.log(heading); - It gives output of object. It is a React element, it is nothing but a normal JS object.
It has keys such as props where content is the props-children and id , xyz are props. Render method is responsible to convert the object to h1 tags and put it on the DOM.

5. If we have to create a nested structure, we can do using this 
```
/**
  <div>
       <div id ="child">
 *          <h1>I'm h1 tag</h1>
 *           <h2>I'm h2 tag second child</h2> Suppose if we have additional children, we can pass array of children
 *      </div>
 * Another child also added as nesting
 *        <div id ="child2">
 *          <h1>I'm h1 tag</h1>
 *           <h2>I'm h2 tag second child</h2> Suppose if we have additional children, we can pass array of children
 *      </div>
 * </div>
 *
 *
 * ReactElement(Object) => HTML(Browser understands)
 */

// We can create the above nested React elements in the following way.
const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", {}, "I'm h1 tag."),
    React.createElement("h2", {}, "I'm h2 tag."),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I'm h1 tag."),
    React.createElement("h2", {}, "I'm h2 tag."),
  ]),
]);
```

But if the nesting continues, the create React elements becomes untidy, tedious, messy and unable to understand so JSX exists. JSX is core of React but we can create HTML element using React. 

6.   
If we have something beforehand in our div root before react root.render is executed, we can see that it gets updated with the elements of render but we can see the update in flashes when we refresh the page. Reading and rendering is done in few milliseconds.
```
    <div id="root">
        <h1>I am here </h1>
        <h1>Hello World!</h1> 
    </div>


    <h1>I am h1</h1>
        <div id="root">
            <h1>I am here </h1>
            <h1>Hello World!</h1> -->
        </div>
    <h1>I am h1</h1>
```
    Since we have specified root as "root" for react, only the elements inside div are updated. h1 tags around div stay same and donot get replaced. React is called library as it can be applied to small portion of page such as header, footer, etc. React can work in place where we make the root as. It is not a full fledged framework. React also can be applied to existing applications. Thus, root defined also matters in React.


# Assignment Theory

1. What is Emmet?
It is a free add on on variety of text editors. It allows faster and easy way to type shortcuts which are later expanded to full pieces of code. It provides shortcut for writing HTML and CSS which expands to HTML markup and CSS rules. By using Emmet, developer will need to 
type less amount of code which saves time.

2. Difference between a Library and Framework?
Libraries provide developer with predefined methods and classes which speeds up development and improves efficiency. Framework aid developers to construct apps for specific platforms. Main technical difference between them is called inversion of control.
One has complete control over application's flow when library is used. It means developer decide when and where one wants to call library. When using a framework, flow is controlled by the framework itself. It provides various locations to plug in code but calls the plugged in code only when its needed.

3. Why is React known as React?
The core concept of React is 'reactive' programming. The term 'reactive' reafers to the ability of the library to react to changes in data and automatically update the user interface in order to reflect those changes. User interface in react consists of components, when the underlying data changes, React updates the affected components rather than re-rendering entire page. This leads to better performance in web pages. React was developed by Facebook and open-sourced in 2013.


4. What is difference between React and ReactDOM?
Prior to  React v0.14, ReactDOM was shipped inside React. But after React v0.14, react was splitted to react and react-dom package. React is JS library designed to build user interfaces. ReactDOM binds idea of React into web browser. If we are using components, classes, elements, we are using React. If we are using methods like render(), findDOMNode(), unmountComponentAtNode() we are using ReactDOM. We know packages like react-native, react-art, react-canvas and react-three uses concept of React but not ReactDOM. It shows React has nothing to do with browsers or DOM. So, by splitting it up, it became more easier to build environments React can render to. DOM stands for document object model. DOM represents entire UI of your application. ReactDOM is a package that provides DOM specific methods that are used to enable efficient way of managaging DOM elements of webpage.
React package contains React.createElement, React.createClass and React.Component, React.PropTypes, React.Children.


5. What is difference between react.development.js and react.production.js files via CDN?
react.development.js version is meant for development. It includes Source Maps, debugging and often hot reloading in those builds. react.production.js has minified and optimized version of your javascript code (source files) which makes the rendering of file on user's browser very quick. No hot reloading included in production.

6. What is async and defer?
On the webpage, script tags are most common to block the parsing of HTML document. As the browser parses HTML document, when it finds script tag, it waits for script to download and execute it. A new request will be executed to fetch script file on server. Only after this, parsing is resumed. Including script without async or defer is the default way to load scripts in HTML document. This is harmful when we place scripts in head tag. Until users see the title of the page, it would take some time to load.
```<script async >```- script is downloaded in paralled with HTML parsing. When the script is downloaded, it is executed
blocking the rendering of HTML until it is finished. The execution order of the scripts differ as it might not be the 
same order in which you load the scripts.

```<script defer > ```- Deferred script will be downloaded in parallel with HTML parsing but its execution is deferred until whole HTML document document has been parsed. Even if multiple scripts are loaded, the same loading order is maintained while executing it.

Both these attributes donot have effect on inline scripts.


# Additional concept (Self)
* (Virtual DOM)
DOM - Document Object model
In simple terms, it is a tree data structure that includes structured representation of HTML elements present in webpage or webapp. DOM represent entire UI of your application. Tree nodes represent each UI element present in web document. It allows to update the content through Javascript. We have seen users using getElementById() or getElementByClass() to update DOM. Everytime there is change in state of your application, DOM is updatd and UI is reflected. Since, DOM is tree like structure, updating DOM frequently is not a problem as there are many algorithms to make the update of tree data structure faster. But what is costly while updating the DOM element is that, whenever DOM gets updated, the updated element and children have to be re-rendered to update UI of the webpage. Updating DOM not only involves changing content but recalculating CSS and changing complex algorithms that are prone to affecting performance. So, React uses concept of Virtual DOM.

React uses concept of virtual DOM, it is the copy of the real DOM. For every object in real DOM, there exist an object in React Virtual DOM. React Virtual DOM doesnot have power to directly change the layout of document. Changing content on real DOM is slow but on virtual DOM is faster as nothing gets drawn on the screen. React maintains two virtual DOM at a time. For any new changes in the application, new virtual DOM is created. So, the changes are compared  between virtual DOM and newly created virtual dom. This process of comparing changes with current and previous is called diffing algorithm. Once found, what is changed, React updates only those objects in Real DOM. Changes to real DOM are sent in batches than sending one by one. We know re-rendering UI is the most expensive part, here React manages to do it efficiently by ensuring Real DOM receives batch updates to rerender UI. This entire process of transforming changes to real DOM is called Reconciliation. This significantly improves the performance.

* Source Maps
It allows to map a transformed file back to original source file. The main purpose of source maps is to aid in debugging and help investigating issues from release builds. Without source map, when running into the error, the stacktrace doesnot include path, filename, line number of error. But with source maps generated, a stacktrace will include path, file name and line number of the original source file. It gives more accurate stacktrace.


* Why <!DOCTYPE html> written first?
It is first html tag written at beginning of any HTML file. It is not an element nor has its closing tag. It is to tell browser that the rendered document is HTML. If broswer doesnot find DOCTYPE declaration, browser will render the document but it enters quirks mode ( it is a technique used by some web browsers for maintaining backward compatibility with webpages designed for old web browsers). In quirks mode, the browser adopt compatibility behaviour to support older HTML specifications adn addresss inconsistencies.

* Why <html lang="en"> ?
HTML lang attribute is used to set primary language for document. It helps to identify language of text content on web. It uses ISO language code as its value.The lang attribute should also be used to identify language of text in document that is different from document primary language. This information helps search engine return language specific results. It is also used by screen readers that switch language profiles to provide correct accent and pronounciation. It makes no apparent difference unless you are a search engine or screen reader.

* HTML head
First section containing webpage properties and links to external files. It contains title of page, meta tags, css code (inserted with <style> tag) , open graph tags and css code. Maximum size of title should be 70 characters.

* Meta tags or elements:
Meta tags or meta elements define contents of webpage. For example, description meta tag is used by search engine to display description of page in search result. It contains what type of information webpage contains. It is most important tag as it is used by search engines to rank page in search results. It should be 150 to 160 characters.

* Charset (Alternatively character set, charset and character encoding, character code)
It specifies character encoding for HTML document. It describes specific encoding for characters as defined in code page. Code page is a page containing list of character codes andd corresponding characters. Charset defines how characters are mapped to bits. ASCII(American Standard Code for Information Interchange) was early standardized encoding system for text. Encoding is process of converting characters in human languages into binary sequences that computers can process. ASCII'S library includes every upper case, lower case, digit and some symbols. It assigns 3 digit ASCII code and a unique byte. The number of characters ASCII can represent is limited. In original ASCII table each character encoded in 7 bits so 128 characters. Nowadays, most editors or readers use extended ASCII table which is encoded on 8 bits so 256 characters included. When ASCII was introduced in 1960, it was enough as developers only needed 128 bytes to reprsent all English characters and symbols. But as computing expanded globally, computers began to store text in languages besides English, many used non-ASCII characters. New systems were developed to map this, but developers needed a better way to encode all possible characters with one system.

* UTF-8 (Unicode Transformation Format - 8 bits)
Unicode solves space issue of ASCII. It assigns character a unique code called code point. It can produce over million code points to enconter every character in every language. It is universal standard for encoding human languages. It also includes emojis. But, Unicode alone doesnot store words in binary. Computers need a way to translate unicode to binary so that its characters can be stored in text files. So, here UTF-8 comes in. UTF-8 is an encoding system for unicode. It can translate any unicode character to a matching binary string and also translate a binary string back to unicode character. UTF-8 convert some characters to one byte and some to 4 bytes to save memory. UTF-8 allows much larger number for less-common characters. Spatial efficiency is key advantage of UTF-8. It has backward compatibility with ASCII.

```<meta charset="UTF-8">``` - This tells browser that HTML file is encoded by UTF-8.

UTF-8 encodes character into binary string of one, two, three or four bytes. UTF-16 encodes a unique character into a string of either two or four bytes.UTF-16 occupies more space so is efficent only on some non english websites. HTML5 specification encourage web developers to use UTF-8 character set as it includes all the characters and symbols of the world.


* ```<meta http-equiv="X-UA-Compatible" content="IE=edge">```
There was problem to create css to address older version of IE(Internet Explorer). X-UA-Compatible is a document mode meta tag that allows web authors to choose what version of Internet Explorer the page should be rendered as. Edge mode tells internet explorer to display content in the highest mode available.

* ```<meta name="viewport" content="width=device-width, initial-scale=1.0">```
Browsers viewport is the area of window in which web content can be seen. It is not the same size as rendered page so browser provides scrollbar for users to scroll around and access content. Vitual viewport is used to make non-mobile-optimized
sites in general to look better on narrow screen devices. However, this is not good for pages that are optimized using media queries. viewport mitigates problem of virtual viewport on narrow screen devices as when webpage rendered in narrow mobile device, since it hasviewport larger than the screen, the webpage appears zoomed out version wher user can zoom in different section of page.
width=device-width- controls size of viewport
initial-scale=1.0 -> controls zoom level when page is first loaded.


* Open graph
It is a technology introduced by Facebook in 2010 that allows integration of facebook and website data. 
By integrating open graph meta tags into page content, we can identify which elements of our page we want to show when one
share the webpage. By specifying open graph information, facebook need not guess what information to use when page is shared.

* HTML body :It contains all the main content of the webpage.

* Shortest program of javascript - empty file
* Shortest program of react - cdn script

* React element is nothing but an object
* ReactDOM is responsible for all DOM operations

* Can we have multiple roots in React?
Generally, we see single root and one render element, doesnot matter how big is the application.

* CSS files are placed in head because they are applied regardless of DOM rendered fully or not. So, the webpage looks elegant
as soon as it loads. If you place css to end, the webpage loads HTML and css is applied to it. It will be visible in screen.
If the internet connection is slow, css would take time to load, so user would be seeing plain HTML initially. There is no 
network request for CSS, so CSSOM (CSS Object Model) building starts immediately. CSSOM cannot be cached, it should be recreated
in each page. Actual CSS files can be cached in order to load assets faster but rendering a page in browser always requires
running a CSSOM parser. While processing HTML, the parser might find link element referencing external stylesheet. 
So, this CSS stylesheet is parsed into a map using CSS Object model specs. The resulting code is then applied to elements of DOM.

* HTML rel="stylesheet" 
This attribute value specifies that external link is a stylesheet that will be applied to current page. This setting only applies to <link> tags. URL for css is specified by href attribute.



